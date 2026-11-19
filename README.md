# Bibek Kumar Yadav — Portfolio Website

Personal portfolio of **Bibek Kumar Yadav**, a Full Stack Developer (ASP.NET Core & WordPress) and Web Developer at **Shiva Tatwa Digital**, studying BSc (Hons) Computer Systems Engineering at ISMT College (University of Sunderland, UK), based in Kathmandu, Nepal.

🔗 **Live site:** [bibek-yadav.com.np](https://bibek-yadav.com.np)
📁 **Repository:** [Bibek_kumar_Yadav-Portfolio](https://github.com/bibekydv285-source/Bibek_kumar_Yadav-Portfolio)

---

## 📌 About

This repository holds the source code of my portfolio: who I am, my work experience, the client and personal projects I've built, my skills, and how to get in touch. It's a pure static site, so it's **fast, free to host and easy to maintain**.

## ✨ Features

- **7 pages:** Home, About, Experience & Education, Skills, Projects, Services and Contact
- **Fully responsive:** mobile, tablet and desktop, with a hamburger menu on small screens
- **Resume & CV:** view in the browser or download as PDF from the Home, About and Experience pages
- **Home page sections:** What I Do service cards, experience snapshot, featured projects, a scrolling tech-stack logo showcase and a "How I Work" timeline
- **About page:** quick stats, at-a-glance facts, languages with flags, a journey timeline and soft skills
- **Experience & Education:** work and education timelines that match my CV
- **Projects:** grouped into **Client Projects** (Shiva Tatwa Digital) and **Personal Projects**, each with a live-site screenshot preview
- **WhatsApp contact form:** opens WhatsApp with the visitor's message ready to send (no backend), with topic chips, floating labels, a character counter and validation
- **Splash screen, animations and hover effects**, with reduced-motion support for accessibility
- **SEO:** meta and Open Graph tags, JSON-LD structured data, `sitemap.xml` and `robots.txt`
- **Free hosting** on Cloudflare Pages with a custom `.com.np` domain and HTTPS

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, custom (no CSS framework), one stylesheet per section |
| Interactivity | Vanilla JavaScript (ES6+) |
| Icons & fonts | [Devicon](https://devicon.dev), [Font Awesome](https://fontawesome.com), [flag-icons](https://flagicons.lipis.dev), Google Fonts (Poppins) |
| Contact form | WhatsApp click-to-chat (`wa.me`) link, no server needed |
| Analytics | Cloudflare Web Analytics |
| Hosting | Cloudflare Pages (free tier) |
| Domain | `bibek-yadav.com.np` (free `.com.np` domain for Nepali citizens) |
| Version control | Git & GitHub |

> **Why pure HTML/CSS/JS?** Cloudflare Pages' free tier only serves static files, so it can't run a C#/.NET backend. Building the site as static HTML/CSS/JS means it's hosted **completely free** with no server to maintain, while JavaScript still makes it interactive in the browser.

## 📂 Project Structure

```
Bibek_kumar_Yadav-Portfolio/
├── index.html                    # Home
├── about.html                    # About
├── education.html                # Experience & Education
├── skills.html                   # Skills
├── projects.html                 # Projects (client + personal)
├── services.html                 # Services
├── contact.html                  # Contact (working form)
│
├── base.css, site.css            # Shared variables, reset and layout
├── nav.css, footer.css           # Header navigation and footer
├── hero.css, home.css            # Home page hero and sections
├── about.css, education.css      # About and Experience & Education pages
├── skills.css, projects.css      # Skills and Projects pages
├── services.css, contact.css     # Services page and contact form
├── splash.css                    # Splash / preloader screen
│
├── contact-form.js               # Contact form → WhatsApp message
├── splash.js                     # Splash screen logic
│
├── images/projects/              # Live-site screenshots (WebP) for project cards
├── Bibek_Kumar_Yadav_Resume.pdf  # One-page resume
├── Bibek_Kumar_Yadav_CV.pdf      # Full two-page CV
├── *.jpeg, profile.jpg           # Profile photos
├── favicon*.png, favicon.ico     # Favicons and apple-touch-icon
├── sitemap.xml, robots.txt       # SEO
└── README.md
```

## 🚀 Getting Started (Run Locally)

No build tools needed. It's plain HTML, CSS and JavaScript.

1. **Clone the repository**
   ```bash
   git clone https://github.com/bibekydv285-source/Bibek_kumar_Yadav-Portfolio.git
   cd Bibek_kumar_Yadav-Portfolio
   ```

2. **Run it**, using either:
   - VS Code's **Live Server** extension (auto-reloads while you edit), **or**
   - a quick local server:
     ```bash
     python -m http.server 5500
     ```
     then open `http://localhost:5500`

   Opening `index.html` directly also works.

## 💬 Contact Form (WhatsApp, No Backend)

The form in `index.html` and `contact.html` is handled by `contact-form.js`:

1. The visitor fills in their name, email, optional phone and subject (or picks a topic chip), and their message.
2. The script checks the required fields and the email format.
3. **Send via WhatsApp** opens `https://wa.me/<number>?text=...` with everything neatly formatted, so the visitor only has to press **Send** in WhatsApp (on their phone or WhatsApp Web).

Nothing is stored or sent to any server. To change the receiving number, edit `WHATSAPP_NUMBER` at the top of `contact-form.js` (international format, no `+` or `00`).

## ☁️ Deployment — Cloudflare Pages (Free)

The live site redeploys automatically on every push to `main`.

1. Push the repo to GitHub.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com): **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select `Bibek_kumar_Yadav-Portfolio`.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty, no build step)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**. Cloudflare gives you a `*.pages.dev` URL.

## 🌐 Custom Domain (`bibek-yadav.com.np`)

1. In Cloudflare, add `bibek-yadav.com.np` as a site under **Websites**.
2. At your `.com.np` registrar, change the domain's **nameservers** to the two Cloudflare nameservers. Propagation can take a few hours.
3. In the **Pages project → Custom domains → Set up a custom domain**, enter `bibek-yadav.com.np` (and `www.bibek-yadav.com.np` if you want it).
4. Cloudflare creates the DNS records and issues a free SSL certificate. A few minutes later the site is live at `https://bibek-yadav.com.np`.

## 🗺️ Roadmap

- [x] Resume and CV downloads
- [x] Working contact form (sends to WhatsApp)
- [x] Live-site previews for projects
- [x] Cloudflare Web Analytics
- [ ] Dark / light mode toggle
- [ ] Blog section
- [ ] Filter projects by tech stack

## 📄 License

Released under the MIT License. Feel free to use the code as a template for your own portfolio; attribution is appreciated. Please don't reuse my personal content (photos, CV and project screenshots).

## 📬 Contact

- **Email:** [Bibekydv51@gmail.com](mailto:Bibekydv51@gmail.com)
- **LinkedIn:** [bibek-yadav-060ba03b2](https://www.linkedin.com/in/bibek-yadav-060ba03b2)
- **GitHub:** [@bibekydv285-source](https://github.com/bibekydv285-source)
- **WhatsApp:** [+977 976 3244805](https://wa.me/9779763244805)
- **Portfolio:** [bibek-yadav.com.np](https://bibek-yadav.com.np)
