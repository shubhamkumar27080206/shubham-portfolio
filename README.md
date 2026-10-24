# Shubham Kumar – Portfolio

Zero-dependency static portfolio (blue theme, animated CI/CD section, walking agent, cinematic boot + warp-speed scroll layer) (HTML + CSS + vanilla JS). No build step.

## Edit content
Everything is rendered from **`js/data.js`** (summary, skills, experience, projects, certifications, contact).
Set `github` (or any `social` link) there to show a GitHub button; set `showPhone: true` to show your phone number.

## Run locally
    python3 -m http.server 8000   # then open http://localhost:8000

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

(CLI alternative: `npx vercel --prod` from this folder.)

## Cinematic layer
`css/cinematic.css` + `js/cinematic.js` add the boot sequence, letterbox reveal, scroll-reactive starfield, film grain, spotlight cards and cursor. Delete those two files and their tags in `index.html` to turn it off. Boot plays once per session and is skipped for reduced-motion users.

## Contact links
In `data.js`: `email` (tap opens mail app), `whatsapp` (digits with country code, opens wa.me chat), `phone`, `linkedin`, `github` and the `social` object (X, Instagram, YouTube, LeetCode, Medium). Empty links stay hidden. They appear in the hero, contact section and a floating side dock.

## Get enquiries on WhatsApp
The contact form sends name, email, phone (optional), message and "came from" (Instagram, LinkedIn, etc.) to your WhatsApp.
1. From your WhatsApp, message **+34 644 51 95 23** the text `I allow callmebot to send me messages`. It replies with an API key (check CallMeBot's site if the number has changed).
2. In Vercel: Project -> Settings -> Environment Variables, add `OWNER_WHATSAPP` = `+918809783125` and `CALLMEBOT_APIKEY` = your key. Redeploy.
3. If the function isn't configured, the form opens a pre-filled WhatsApp chat to your number instead, so nothing is lost.
Put `?utm_source=instagram` on your Instagram bio link and `?utm_source=linkedin` on your LinkedIn link so the source is always reported (in-app browsers often hide the referrer).
