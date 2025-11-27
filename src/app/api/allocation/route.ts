import { NextResponse } from 'next/server';

let allocation = {
  'FII': 40,
  'Ação': 30,
  'Renda Fixa': 20,
  'Cripto': 10,
};

export async function GET() {
  return NextResponse.json(allocation);
}

export async function POST(request: Request) {
  const body = await request.json();
  allocation = body;
  return NextResponse.json(allocation);
}
