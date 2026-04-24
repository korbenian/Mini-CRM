import { NextResponse } from "next/server";
import axios from "axios";
import { useTranslations } from "next-intl";
//C:\Users\User\mini-crm\app\api\chat\route.ts

export async function POST(req: Request) {

    console.log(">>> API ROUTE HIT!");
  try {
    const body = await req.json();
    console.log(">>> Body:", body)
    const { message } = body;

   if (!message) {
      return NextResponse.json({ error: "NO_MESSAGE" }, { status: 400 });
    }
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'mini-crm'
        }
      }
    );

    return NextResponse.json({
      reply: response.data.choices[0].message.content
    });

  } catch (err: any) {
    console.error( err.response?.data || err.message);
   return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 })
  }
}