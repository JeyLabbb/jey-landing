PROYECTO BASE — VERCEL + MAILERLITE (SIN TERMINAL)

PASO 1 — Crear repositorio
1) Entra a GitHub y crea un repo vacío (público o privado).
2) Pulsa “Add file” > “Upload files” y arrastra TODOS los archivos de esta carpeta (incluido /api/subscribe.js).
3) Pulsa “Commit changes”.

PASO 2 — Importar en Vercel
1) Entra a vercel.com > New Project > Importa el repo.
2) Framework = “Other”, no toques build ni output.
3) Deploy.

PASO 3 — Variables de entorno (Vercel)
1) Project > Settings > Environment Variables
2) Añade:
   - MAILERLITE_TOKEN = tu API key (Bearer)
   - MAILERLITE_GROUP_ID = (opcional) id de un grupo de MailerLite
3) Vuelve a desplegar (Redeploy).

PASO 4 — Probar
1) Abre tu dominio de Vercel (o Preview).
2) Mete un email y envía.
3) Verás confirmación y la animación (puertas y asiento).
