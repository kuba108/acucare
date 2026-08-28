import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jmeno, email, telefon, poznamka, souhlasGdpr, zajemPristroj } = body;

    if (!jmeno || !email || !telefon || !souhlasGdpr) {
      return NextResponse.json(
        { error: 'Vyplňte prosím všechna povinná pole a potvrďte souhlas se zpracováním osobních údajů.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@acucare.cz';

    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'AcuCare <onboarding@resend.dev>',
          to: [notificationEmail],
          reply_to: email,
          subject: `Nová poptávka / objednávka přístroje: ${jmeno}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f6f9f9; border-radius: 16px; border: 1px solid #bec9c5;">
              <h2 style="color: #50aab2; margin-top: 0;">Nová poptávka z webu AcuCare</h2>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e1e9eb;">
                <p style="margin: 8px 0;"><strong>Jméno a příjmení:</strong> ${jmeno}</p>
                <p style="margin: 8px 0;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #50aab2;">${email}</a></p>
                <p style="margin: 8px 0;"><strong>Telefon:</strong> <a href="tel:${telefon}" style="color: #50aab2;">${telefon}</a></p>
                <p style="margin: 8px 0;"><strong>Zájem o nabídku přístroje:</strong> ${zajemPristroj ? '<span style="color: #286b33; font-weight: bold;">ANO</span>' : 'NE'}</p>
              </div>
              <div style="margin-top: 16px; background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e1e9eb;">
                <h3 style="color: #50aab2; margin-top: 0; font-size: 16px;">Poznámka / Zpráva:</h3>
                <p style="white-space: pre-wrap; color: #333333; margin: 0;">${poznamka ? poznamka : 'Bez poznámky'}</p>
              </div>
              <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #bec9c5; font-size: 12px; color: #666666;">
                <p style="margin: 4px 0;"><strong>Souhlas se zpracováním OÚ (GDPR):</strong> Udělen</p>
                <p style="margin: 4px 0;">Odesláno přes Resend API z AcuCare</p>
              </div>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error('Resend API Error:', errorData);
      }
    } else {
      console.log('RESEND_API_KEY není nastaven v .env.local. Přijatá objednávka:', {
        jmeno,
        email,
        telefon,
        poznamka,
        souhlasGdpr,
        zajemPristroj,
        datum: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Chyba při odesílání objednávky přes Resend API:', error);
    return NextResponse.json(
      { error: 'Při odesílání dochází k chybě. Zkuste to prosím znovu.' },
      { status: 500 }
    );
  }
}
