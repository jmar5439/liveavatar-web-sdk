// apps/demo/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../secrets"; // tu clave secreta

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover", // última versión soportada
});

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();

  if (!priceId) {
    return NextResponse.json({ error: "No priceId provided" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // <-- usamos directamente el Price ID
          quantity: 1,
        },
      ],
      mode: "payment", // o "subscription" si es un plan recurrente
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    // Convertimos unknown a Error de forma segura
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
