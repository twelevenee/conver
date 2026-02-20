# 💬 Conversation Repair Coach

> A mini NLP web app that helps you say hard things with care — especially useful in long-distance relationships.

---

## This repo contains two versions

| | Version | Description |
|---|---|---|
| **v1** | [`index.html`](./index.html) | Single-file prototype — zero dependencies, entire app in one HTML file |
| **v2** | [`conversation-repair-coach/`](./conversation-repair-coach) | Full-stack Next.js app — secure server-side API key, TypeScript, component architecture |

The prototype was built first to validate the idea quickly. The Next.js version addresses the main limitation of v1: the Anthropic API key was exposed in client-side code. In v2, all API calls happen server-side via a Route Handler — the key never appears in the browser bundle or network requests.

---

## What it does

Paste a message you're unsure about (or a full conversation thread). The app uses Claude AI to:

- 🚩 **Flag harmful patterns** — "you always…", blame language, contempt, mind-reading, stonewalling cues
- 🧠 **NVC Breakdown** — surfaces the underlying *observation → feeling → need → request* beneath your words (based on [Nonviolent Communication](https://en.wikipedia.org/wiki/Nonviolent_Communication))
- ✍️ **Generate 3 rewrites** — Direct but gentle / Vulnerable & open / De-escalating

### 💞 Couples Mode (unique feature)

Both partners paste their messages side-by-side. The app analyzes each perspective independently, then synthesizes:
- What each person is *really* feeling and needing
- Shared underlying needs between both messages
- A concrete "bridge" — one thing both people can do to move toward each other

---

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — zero dependencies, zero build step |
| AI | [Anthropic Claude API](https://docs.anthropic.com) (`claude-sonnet-4`) |
| Hosting | GitHub Pages / Netlify / Vercel (static file) |
| Fonts | Google Fonts (Lora + DM Sans) |

The entire app is a **single HTML file** — no Node, no bundler, no framework overhead.

---

## Getting started

### Option A — Open locally (no API key needed for demo)

```bash
git clone https://github.com/your-username/conversation-repair-coach.git
cd conversation-repair-coach
open index.html   # or just drag into browser
```

> ⚠️ The app calls the Anthropic API directly from the browser. This works when Claude.ai injects an auth token (e.g. when deployed through Anthropic's platform). For standalone hosting, see Option B.

### Option B — Self-hosted with your own API key

The app is built to work with Anthropic's API. For self-hosted use, you'll want a small backend proxy so your API key isn't exposed in the browser.

**Quick proxy with Node + Express:**

```bash
npm install express cors node-fetch dotenv
```

```js
// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Proxy running on :3000'));
```

Then update the fetch URL in `index.html` from `https://api.anthropic.com/v1/messages` to `http://localhost:3000/api/analyze`.

---

## Deploying to Netlify (recommended, free)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/your-username/conversation-repair-coach.git
git push -u origin main

# 2. Go to netlify.com → "Add new site" → "Deploy from GitHub"
# 3. Select your repo — no build command needed, publish directory = /
# 4. Done. Your app is live.
```

---

## Project structure

```
conversation-repair-coach/
├── index.html        # Entire app — UI, styles, and logic
└── README.md         # This file
```

---

## NVC — what's that?

[Nonviolent Communication](https://www.cnvc.org/) (NVC) is a framework developed by Marshall Rosenberg that structures communication around four components:

1. **Observation** — what happened, factually, without evaluation
2. **Feeling** — the emotion this brings up
3. **Need** — the underlying human need that's met or unmet
4. **Request** — a specific, doable ask

The app uses this as a lens to decode what you're really trying to say, then rewrites your message to express it more clearly.

---

## Roadmap / ideas

- [ ] Session history (IndexedDB)
- [ ] Tone slider (more assertive ↔ more gentle)
- [ ] "What triggered this?" pre-analysis step
- [ ] Export conversation summary as PDF
- [ ] PWA / mobile app

---

## License

MIT — use it, fork it, build on it.

---

## Author

Built by [Jey Kim](https://github.com/twelevenee) as a personal project for navigating long-distance relationship communication. Inspired by NVC and the general human difficulty of saying hard things kindly.
