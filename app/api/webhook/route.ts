import prisma from '@/libs/prismadb';
import stripe from '@/libs/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    console.log('❄️ ~ file: route.ts:20 ~ error:', error);
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    //@ts-ignore
    const email = session.billing_details?.email;
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isSubscribed: true,
      },
    });
  }
  return new NextResponse(null, { status: 200 });
}
