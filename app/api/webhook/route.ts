import prisma from '@/libs/prismadb';
import stripe from '@/libs/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
  console.log('❄️ ~ file: route.ts:10 ~ headers:', headers);
  if (!signature) {
    return new NextResponse(`No Stripe Signature found`, {
      status: 401,
    });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === 'checkout.session.completed') {
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
