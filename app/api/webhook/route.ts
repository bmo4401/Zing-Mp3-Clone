import prisma from '@/libs/prismadb';
import stripe from '@/libs/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }
  console.log('❄️ ~ file: route.ts:12 ~ event:', event);

  const session = event.data.object as Stripe.Checkout.Session;
  //@ts-ignore
  const email = session.billing_details?.email;

  if (event.type === 'checkout.session.completed') {
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
