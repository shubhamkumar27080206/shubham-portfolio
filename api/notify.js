/* Vercel serverless function: forwards a contact-form enquiry to the owner's WhatsApp.
   Env vars (Vercel -> Project -> Settings -> Environment Variables):
     OWNER_WHATSAPP   e.g. +918809783125
     CALLMEBOT_APIKEY key you get from the free CallMeBot WhatsApp bot (see README)
   Only runs when a visitor presses "Send". Nothing is tracked or stored. */
const clean = (v, n) => String(v || "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let b = req.body;
  try { if (typeof b === "string") b = JSON.parse(b || "{}"); } catch (e) { b = {}; }
  b = b || {};
  const name = clean(b.name, 80), email = clean(b.email, 120), phone = clean(b.phone, 30),
        source = clean(b.source, 60), message = clean(b.message, 1000);
  if (b.company || !name || !/^\S+@\S+\.\S+$/.test(email) || !message) return res.status(400).json({ ok: false });

  const owner = process.env.OWNER_WHATSAPP, key = process.env.CALLMEBOT_APIKEY;
  if (!owner || !key) return res.status(501).json({ ok: false, error: "not configured" });

  const text = `📩 New portfolio enquiry\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCame from: ${source || "Direct"}\n\n${message}`;
  try {
    const r = await fetch(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(owner)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`);
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) { return res.status(502).json({ ok: false }); }
};
