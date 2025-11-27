import { NextResponse } from 'next/server';

let assets = [
  { id: '1', name: 'MXRF11', class: 'FII', value: 1500, quantity: 150 },
  { id: '2', name: 'PETR4', class: 'Ação', value: 3000, quantity: 100 },
];

export async function GET() {
  return NextResponse.json(assets);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newAsset = { ...body, id: Date.now().toString() };
  assets.push(newAsset);
  return NextResponse.json(newAsset);
}

export async function PUT(request: Request) {
  const body = await request.json();
  assets = assets.map(a => a.id === body.id ? body : a);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  assets = assets.filter(a => a.id !== id);
  return NextResponse.json({ success: true });
}
