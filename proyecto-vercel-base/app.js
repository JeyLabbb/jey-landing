// Lógica básica del formulario y animaciones
const form = document.getElementById('form');
const msg  = document.getElementById('msg');
const btn  = document.getElementById('cta');

function openDoors() {
  document.getElementById('doors').classList.add('open');
  setTimeout(() => document.getElementById('seat').classList.add('show'), 800);
}

async function subscribe(email, name) {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Fallo al suscribir');
  return data;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  btn.disabled = true;
  const email = (document.getElementById('email').value || '').trim();
  const name  = (document.getElementById('name').value || '').trim();
  try {
    await subscribe(email, name);
    msg.textContent = '¡Listo! Revisa tu correo.';
    openDoors();
    form.reset();
  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
