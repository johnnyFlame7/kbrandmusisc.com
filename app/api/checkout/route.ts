import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Creates a real Stripe Checkout Session using YOUR Stripe secret key
// (from your own Stripe account, set in the environment). Money goes
// straight to your connected Stripe account — this app never touches it.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body as {
      items: { productId: number; name: string; price: number; size: string; qty: number; image: string }[];
      customer: { name: string; email: string; address: string; city: string; postalCode: string; country: string };
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
    const shipping = subtotal > 100 ? 0 : 8;

    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        address: customer.address,
        city: customer.city,
        postalCode: customer.postalCode,
        country: customer.country,
        subtotal,
        shipping,
        total: subtotal + shipping,
        status: "pending",
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            size: i.size,
            qty: i.qty,
          })),
        },
      },
    });

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const line_items = items.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: { name: `${i.name} (Size ${i.size})` },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.qty,
    }));

    if (shipping > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customer.email,
      success_url: `${baseUrl}/checkout/success?order=${order.id}`,
      cancel_url: `${baseUrl}/cart`,
      metadata: { orderId: String(order.id) },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Checkout failed. Have you set STRIPE_SECRET_KEY in your .env?" },
      { status: 500 }
    );
  }
}
