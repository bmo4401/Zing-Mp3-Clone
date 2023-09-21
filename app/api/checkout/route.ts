import stripe from '@/libs/stripe';
import { NextResponse } from 'next/server';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function OPTIONS(req: Request, res: Response) {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1NskQnF8nm8tvbVtwq48ZguX',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: process.env.NEXTAUTH_URL,
        cancel_url: process.env.NEXTAUTH_URL,
      });
      return NextResponse.json(
        { url: session.url },
        {
          headers: corsHeaders,
        },
      );
    } catch (err: any) {
      return new NextResponse(err.message, { status: 400 });
    }
  } else {
    return NextResponse.json('Method Not Allowed', {
      status: 405,
      headers: [['Allow', 'POST']],
    });
  }
}
