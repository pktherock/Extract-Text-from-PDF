import extractTextFromPDF from '@/utils/extract';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Hello I am extract api function');
  const reqBody = await req.arrayBuffer();
  console.log(reqBody);

  const pdfBuffer = reqBody; // You need to provide the PDF data
  const extractedText = await extractTextFromPDF(pdfBuffer);
  return NextResponse.json({ data: extractedText }, { status: 200 });
}
