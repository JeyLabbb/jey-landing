// /api/subscribe.js — Vercel Function (runtime standard Web API)
export async function POST(request) {
  try {
    const { email, name } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400 });
    }

    const token = process.env.MAILERLITE_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID; // opcional

    // 1) Crear/actualizar suscriptor en MailerLite
    const createRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined
      })
    });

    const created = await createRes.json();
    if (!createRes.ok) {
      return new Response(JSON.stringify(created), { status: createRes.status });
    }

    // 2) Añadir a grupo (opcional)
    if (groupId && created?.data?.id) {
      await fetch(`https://connect.mailerlite.com/api/subscribers/${created.data.id}/groups/${groupId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error inesperado', detail: String(err) }), { status: 500 });
  }
}
