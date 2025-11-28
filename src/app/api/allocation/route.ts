import { NextResponse } from 'next/server';

let allocation = {
  'FII': 0,
  'Ação': 0,
  'Renda Fixa': 0,
  'Cripto': 0,
};

export async function GET() {
  return NextResponse.json(allocation);
}

export async function POST(request: Request) {
  const body = await request.json();
  allocation = body;
  return NextResponse.json(allocation);
}
