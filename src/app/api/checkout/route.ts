import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const creditPackageSchema = z.enum([
  "starter",
  "creator",
  "pro",
  "studio",
]);
export type CreditPackage = z.infer<typeof creditPackageSchema>;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const priceIdMapping: Record<CreditPackage, string> = {
  starter: process.env.STRIPE_PRICE_ID_STARTER as string,
  creator: process.env.STRIPE_PRICE_ID_CREATOR as string,
  pro: process.env.STRIPE_PRICE_ID_PRO as string,
  studio: process.env.STRIPE_PRICE_ID_STUDIO as string,
};

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const creditTypeResult = creditPackageSchema.safeParse(
    searchParams.get("type"),
  );

  if (!creditTypeResult.success) {
    return new Response("No product of this type available.", { status: 400 });
  }

  const priceId: string = priceIdMapping[creditTypeResult.data];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL!}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL!}/?canceled=true`,
    });

    return NextResponse.redirect(session.url || "", 303);
  } catch (error) {
    return new Response("Could not create checkout session", { status: 501 });
  }
}
