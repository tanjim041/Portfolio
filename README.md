# Tanjimul Islam — Developer Portfolio

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)

## About

A modern, production-quality personal portfolio built with React 19, Vite, and Tailwind CSS v4. Designed to showcase software projects, technical skills, and academic background with a premium dark-themed UI, smooth animations, and full responsiveness.

## Live Demo

**Portfolio Website:**
[https://tanjim041.vercel.app](https://tanjim041.vercel.app)

**Repository:**
[https://github.com/tanjim041/Portfolio](https://github.com/tanjim041/Portfolio)

## Features

- ⚡ Lightning-fast build with Vite
- ⚛️ React 19 with functional components and hooks
- 🎨 Tailwind CSS v4 with custom dark theme
- 🎭 Framer Motion scroll and entrance animations
- ✨ Interactive particle background (tsparticles)
- ⌨️ Custom typing animation effect
- 📱 Fully responsive (mobile, tablet, desktop)
- 📊 Data-driven — all content lives in a single JS file
- 📝 Contact form with validation (React Hook Form + Web3Forms)
- 🔍 SEO optimized (meta tags, Open Graph, sitemap)
- ♿ Accessible (ARIA labels, semantic HTML, keyboard navigation)
- 🚀 One-click Vercel deployment

## Technology Stack

| Category       | Technologies                                        |
| -------------- | --------------------------------------------------- |
| **Framework**  | React 19, Vite                                      |
| **Styling**    | Tailwind CSS v4                                     |
| **Animations** | Framer Motion, tsparticles                          |
| **Icons**      | Lucide React, React Icons                           |
| **Forms**      | React Hook Form, Web3Forms API                      |
| **Linting**    | ESLint, Prettier                                    |
| **Deployment** | Vercel                                              |

## Folder Structure

```text
Portfolio/
├── public/
│   ├── images/              # Portfolio images
│   ├── cv/                  # CV PDF file
│   ├── icons/               # Custom icons
│   ├── favicon.svg          # Site favicon
│   ├── robots.txt           # SEO robots file
│   └── sitemap.xml          # SEO sitemap
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ActivityCard.jsx
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── InfoCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── SkillCard.jsx
│   │   ├── SocialIcon.jsx
│   │   └── TimelineItem.jsx
│   ├── sections/            # Page sections
│   │   ├── About.jsx
│   │   ├── Activities.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollPosition.js
│   │   └── useTypingEffect.js
│   ├── data/
│   │   └── portfolio.js     # All portfolio content (edit this!)
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & Tailwind theme
├── index.html               # Vite entry HTML
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # (legacy — theme now in CSS)
├── vercel.json              # Vercel deployment config
├── package.json
├── eslint.config.js
├── .prettierrc
└── README.md
```

## Installation

```bash
git clone https://github.com/tanjim041/Portfolio.git
cd Portfolio
npm install
```

## Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no configuration needed
4. Set environment variable `VITE_WEB3FORMS_KEY` with your Web3Forms access key
5. Deploy!

Every push to `main` will trigger automatic redeployment.

### Manual

```bash
npm run build
# Upload the `dist/` directory to any static hosting
```

## Customization

All portfolio content is driven by **`src/data/portfolio.js`**. You never need to edit JSX to update:

- **Personal info** — name, subtitle, about, university, location, email
- **Education** — institutions, degrees, scores, durations
- **Skills** — hard skills and soft skills lists
- **Projects** — title, description, tech stack, links, status
- **Activities** — title, description, images
- **Social links** — platform, URL, icon name
- **Contact info** — address, phone, email

### Other Customizations

- **Images**: Place files in `public/images/` and reference them as `/images/filename.jpg`
- **CV**: Replace `public/cv/Tanjim_CV.pdf` with your updated resume
- **Colors**: Edit the `@theme` block in `src/index.css`
- **Contact Form**: Set `VITE_WEB3FORMS_KEY` environment variable with your Web3Forms API key

## License

© 2026 Md. Tanjimul Islam — All Rights Reserved.

## Author

**Name:** Md. Tanjimul Islam
**University:** Ahsanullah University of Science and Technology
**Department:** Computer Science & Engineering
**GitHub:** [https://github.com/tanjim041](https://github.com/tanjim041)
**Portfolio:** [https://tanjim041.vercel.app](https://tanjim041.vercel.app)
