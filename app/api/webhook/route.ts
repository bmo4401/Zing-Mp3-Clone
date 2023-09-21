import getCurrentUser from '@/actions/getCurrentUser';
import stripe from '@/libs/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/libs/prismadb';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

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
  //@ts-ignore
  const email = session.billing_details?.email;

  if (session.status === 'complete' || email) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        isSubscribed: true,
      },
    });
    return NextResponse.json('Successfully', { status: 200 });
  }
}
