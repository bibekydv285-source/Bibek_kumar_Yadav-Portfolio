# Bibek Kumar Yadav Portfolio Website

Personal portfolio website of **Bibek Kumar Yadav**, BSc (Hons) Computer Systems Engineering student at ISMT College (University of Sunderland, UK), based in Kathmandu, Nepal.

🔗 **Live Site:** [bibek-yadav.com.np](https://bibek-yadav.com.np)
📁 **Repository:** [Bibek_kumar_Yadav-Portfolio](https://github.com/bibekydv285-source/Bibek_kumar_Yadav-Portfolio)

---

## 📌 About

This repository contains the source code for my personal portfolio website a showcase of who I am, the projects I've built, my skills, and how to get in touch with me. It's built to be **fast, free to host, and easy to maintain**.

## ✨ Features

- Responsive design — works on mobile, tablet, and desktop
- Hero / About / Skills / Projects / Contact sections
- Project showcase with links to completed work
- Working contact form (visitors can email me directly from the site no backend server required)
- Social links with hover effects (GitHub, LinkedIn, WhatsApp, Email)
- Fast load times — pure static site, no framework overhead
- Deployed for free on Cloudflare Pages with a custom `.com.np` domain

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, no framework or list Bootstrap/Tailwind if used) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Contact form backend | [Web3Forms](https://web3forms.com) (free API, no server needed) |
| Hosting | Cloudflare Pages (free tier) |
| Domain | `bibek-yadav.com.np` (free Nepal Government domain via Mos.com.np) |
| Version control | Git & GitHub |

> **Why pure HTML/CSS/JS?** Cloudflare Pages' free tier only serves static files it cannot run a C#/.NET backend. Building the site as static HTML/CSS/JS means it can be hosted **completely free**, with no server to maintain, while still being fully "dynamic" in the browser via JavaScript.

## 📂 Project Structure

```
Bibek_kumar_Yadav-Portfolio/
├── index.html              # Home page
├── about.html               # About page
├── projects.html            # Projects showcase
├── services.html             # Services page
├── contact.html              # Contact page (working form)
├── /css
│   └── style.css             # Main stylesheet
├── /js
│   └── script.js             # Main JS (nav, animations, form handler)
├── /assets
│   ├── /images                # Images, icons, screenshots
│   └── /docs                  # Resume/CV PDF, etc.
├── README.md
└── LICENSE
```

> Update this section to match your actual folder/file names once finalized.

## 🚀 Getting Started (Run Locally)

You don't need any build tools it's plain HTML/CSS/JS.

1. **Clone the repository**
   ```bash
   git clone https://github.com/bibekydv285-source/Bibek_kumar_Yadav-Portfolio.git
   cd Bibek_kumar_Yadav-Portfolio
   ```

2. **Open it locally** — either:
   - Double-click `index.html` to open it in your browser, **or**
   - Use VS Code's **Live Server** extension for auto-reload while editing, **or**
   - Run a quick local server:
     ```bash
     python -m http.server 5500
     ```
     then visit `http://localhost:5500`

## 📧 Contact Form Setup (Web3Forms Free, No Backend)

The contact form works without any server code, using [Web3Forms](https://web3forms.com):

1. Go to [web3forms.com](https://web3forms.com) and sign up free with your email.
2. Copy your **Access Key**.
3. In `contact.html`, your form should look like this:
   ```html
   <form action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
     <input type="text" name="name" required placeholder="Your Name">
     <input type="email" name="email" required placeholder="Your Email">
     <textarea name="message" required placeholder="Your Message"></textarea>
     <button type="submit">Send Message</button>
   </form>
   ```
4. Replace `YOUR_ACCESS_KEY_HERE` with your real key.
5. That's it — form submissions arrive directly in your inbox. Free tier allows up to 250 submissions/month.

No API keys are ever exposed as "secret" here — the Web3Forms access key is designed to be public in client-side code (it's not a password), but you can add spam protection (honeypot field, reCAPTCHA) via their docs if needed.

## ☁️ Deployment — Cloudflare Pages (Free)

1. **Push this repo to GitHub** (already done ✅).
2. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select this repository (`Bibek_kumar_Yadav-Portfolio`).
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty no build step needed)*
   - **Build output directory:** `/` (or your folder containing `index.html`)
5. Click **Save and Deploy**. Cloudflare will give you a live URL like `bibek-kumar-yadav-portfolio.pages.dev`.

## 🌐 Connecting the Custom Domain (`bibek-yadav.com.np`)

1. In Cloudflare dashboard, add `bibek-yadav.com.np` as a site (if not already added) under **Websites**.
2. Update your domain's **nameservers** at your registrar (Mos.com.np) to the two Cloudflare nameservers shown in your Cloudflare dashboard. This can take a few hours to propagate.
3. Once the domain is active on Cloudflare, go to your **Pages project → Custom domains → Set up a custom domain**.
4. Enter `bibek-yadav.com.np` (and `www.bibek-yadav.com.np` if desired) Cloudflare will automatically create the correct DNS records and issue a free SSL certificate.
5. Wait a few minutes for SSL to activate — your site will then be live at `https://bibek-yadav.com.np` with HTTPS, for free.

## 🗺️ Roadmap

- [ ] Add dark mode toggle
- [ ] Add blog section
- [ ] Add project filtering by tech stack
- [ ] Add analytics (Cloudflare Web Analytics — free & privacy-friendly)

## 📄 License

This project is open source under the [MIT License](LICENSE) feel free to use it as a template for your own portfolio, with attribution appreciated.

## 📬 Contact

- **Email:** Bibekydv51@gmail.com
- **LinkedIn:** [bibek-yadav-060ba03b2](https://linkedin.com/in/bibek-yadav-060ba03b2)
- **GitHub:** [@bibekydv285-source](https://github.com/bibekydv285-source)
- **WhatsApp:** +977 976 3244805
- **Portfolio:** [bibek-yadav.com.np](https://bibek-yadav.com.np)
