import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt, style, size } = await req.json();

  if (!process.env.FAL_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  const finalPrompt = `${prompt}, tattoo design, ${style}, white background, high quality`;

  try {
    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: finalPrompt, image_size: size || 'square_hd' }),
    });

    const data = await response.json();
    return NextResponse.json({ imageUrl: data.images[0].url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
