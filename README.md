# 🎓 SmartRevise AI

A premium, Generative AI-powered revision tool that transforms complex PDF study materials into beautifully structured revision kits, including summaries, key concepts, formulas, and curated visual learning paths.

## 🚀 Deployment Instructions

### 1. Environment Variables
This application requires a Google Gemini API Key. 
- Obtain your key from [Google AI Studio](https://aistudio.google.com/).
- In your hosting provider (Vercel, Netlify, etc.), add an environment variable named:
  `API_KEY`

### 2. Deploy to Vercel (Recommended)
The easiest way to deploy is using the Vercel CLI or by linking your GitHub repository:
- **Build Command:** (If using a bundler) `npm run build` or simply serve as a static site.
- **Output Directory:** Project Root
- **Environment Variable:** Ensure `API_KEY` is set in the Vercel Dashboard under Settings > Environment Variables.

### 3. Deploy to Netlify
- Create a new site from your Git provider.
- Set the Build Command to `blank` (or your build script).
- Add the `API_KEY` variable in the Netlify site settings.

## 🛠 Tech Stack
- **Frontend:** React 19 (ESM)
- **Styling:** Tailwind CSS (Custom Theme)
- **AI Engine:** Google Gemini 3 (Flash & Pro)
- **Math Rendering:** Custom JetBrains Mono Math Stack
- **Icons:** Lucide-inspired SVG components

## 📝 Features
- **PDF Analysis:** Deep scanning of academic documents.
- **Subject Context:** Tailored extraction for 8+ academic disciplines.
- **Smart Formulas:** LaTeX-formatted equation cards with usage guides.
- **Visual Paths:** Automated YouTube search query generation for visual learners.

---
*Created by a Senior Frontend Engineer for high-performance learning.*
