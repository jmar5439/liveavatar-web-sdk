// apps/demo/app/api/checkout/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../secrets"; // import your secret key

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover", // Use the latest version your SDK supports
});
export async function POST(req: NextRequest) {
  const { tierName } = await req.json();

  const priceMap: Record<string, number> = {
    Basic: 12000, // €120 in cents
    Pro: 12000,
    Enterprise: 0, // Custom
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: `${tierName} Credits Package` },
          unit_amount: priceMap[tierName],
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
}
