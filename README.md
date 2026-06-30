# Tanjimul Islam - Developer Portfolio

![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success?style=for-the-badge&logo=github)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-blue?style=for-the-badge)

A modern, premium, fully responsive personal developer portfolio built to showcase my education, technical skills, software projects, extracurricular activities, achievements, and contact information. The portfolio is currently deployed using **GitHub Pages**.

---

## 🚀 Live Demo

**Portfolio Website:**  
[https://tanjim041.github.io/Portfolio/](https://tanjim041.github.io/Portfolio/)

**Repository:**  
[https://github.com/tanjim041/Portfolio](https://github.com/tanjim041/Portfolio)

---

## 📸 Preview

*(Add screenshots here)*

---

## ✨ Features

- **Modern Premium UI:** Designed with a sleek, dark aesthetic, glassmorphism elements, and glowing accents.
- **Dark Theme:** High contrast, professional dark mode prioritized for developer portfolios.
- **Fully Responsive:** Adapts flawlessly to mobile, tablet, and desktop viewports.
- **Mobile Friendly:** Clean navigation and layout sizing for handheld devices.
- **Dynamic Portfolio Data:** Content is seamlessly driven by a centralized `portfolio.json` configuration file.
- **Smooth Scrolling:** Effortless navigation between sections.
- **Scroll Animations:** Powered by AOS (Animate on Scroll) for a dynamic viewing experience.
- **Animated Typing Effect:** Interactive hero section highlighting personal titles.
- **Interactive Particle Background:** Engaging geometric particles in the hero area using Particles.js.
- **Education Timeline:** A custom vertical animated timeline detailing academic progression.
- **Skills Section:** Well-organized grid segregating Hard and Soft skills.
- **Project Showcase:** Interactive project cards with hover-zoom, status badges, and tech stack tags.
- **Contact Section:** Fully functional, secure static contact form integrated with Web3Forms.
- **Downloadable CV:** Embedded PDF viewer with direct download functionality.
- **Optimized for GitHub Pages:** Fully static architecture requiring no backend infrastructure.
- **Clean Architecture:** Component-based EJS templates compiled into static HTML.
- **Fast Loading:** Minified assets and optimized delivery.
- **SEO Friendly:** Semantic HTML5 structure.
- **Accessible Design:** Proper ARIA labels, contrast ratios, and keyboard-friendly navigation.

---

## 🛠️ Technology Stack

**Frontend**
- HTML5
- Tailwind CSS (Utility-first CSS framework)
- JavaScript (ES6+)

**Animations & Interactivity**
- AOS (Animate on Scroll)
- Particles.js

**Icons**
- Lucide Icons (Lightweight SVG icons)

**Data Management**
- JSON (`portfolio.json`)

**Hosting & Deployment**
- GitHub Pages

---

## 📁 Folder Structure

```text
Portfolio/
├── data/
│   └── portfolio.json       # All dynamic content goes here
├── public/
│   ├── css/
│   │   ├── input.css        # Custom CSS and Tailwind directives
│   │   └── style.css        # Compiled and minified output CSS
│   ├── js/
│   │   └── main.js          # Core interactive logic (AOS, Particles, Forms)
│   ├── images/              # Assets for projects, profile, and activities
│   └── cv/                  # Resume PDF files
├── views/
│   ├── index.ejs            # Main page template
│   └── partials/            # Modular UI components (hero, about, projects, etc.)
├── index.html               # Final compiled static entry point for GitHub Pages
├── package.json             # Build scripts and dev dependencies
├── tailwind.config.js       # Tailwind theme and plugin configuration
├── build.js                 # Node script compiling EJS + JSON into index.html
├── updatePaths.js           # Utility script for asset path management
└── README.md                # Project documentation
```

---

## ⚙️ Installation

To set up the project locally for development or customization:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanjim041/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   *(Required for compiling Tailwind CSS and building the HTML)*
   ```bash
   npm install
   ```

3. **Run the local development environment:**
   This command concurrently watches for Tailwind CSS changes and automatically rebuilds the `index.html` file when you modify the EJS templates or JSON data.
   ```bash
   npm run dev
   ```

4. **View locally:**
   Use the **Live Server** extension in VS Code on `index.html`, or run:
   ```bash
   npx serve .
   ```
   Then open `http://localhost:3000` in your browser.

---

## 🌐 Deployment

This project is configured and optimized for **GitHub Pages**.

1. Ensure all your changes are built and your `index.html` and `public/css/style.css` are updated.
   ```bash
   npm run build
   ```
2. Commit and push your changes to the `main` branch.
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
3. GitHub Pages will automatically serve the `index.html` file from the root directory of the `main` branch.

---

## 🎨 Customization

The portfolio is designed to be easily modified without diving deep into HTML structures.

- **Update Portfolio Information:** Open `data/portfolio.json` to change your biography, add new projects, update skills, or modify your education history. Run `npm run build` afterward.
- **Add/Replace Images:** Place your images inside the `public/images/` directory and update the corresponding path in `portfolio.json`.
- **Replace CV:** Replace the `public/cv/Tanjim_CV.pdf` file with your actual PDF resume.
- **Update Colors & Theme:** Open `tailwind.config.js` and modify the `theme.extend.colors` object to completely change the accent colors, backgrounds, and text styling globally.
- **Change Social Links:** Update the `socials` array in `portfolio.json` with your relevant profile URLs.

---

## ⚡ Performance

- **Responsive Design:** Looks incredible on ultrawide monitors and small mobile screens alike.
- **Fast Loading:** Uses minified CSS (`npm run build`) and relies on purely static HTML delivery.
- **Optimized Assets:** Zero heavy frontend frameworks; relies purely on vanilla JS and Tailwind.
- **Modern CSS:** Utilizes CSS Grid, Flexbox, and Tailwind utilities.
- **Accessibility:** Uses semantic HTML tags to ensure screen-reader compatibility.
- **Cross-browser Compatibility:** Tested on Chrome, Firefox, Safari, and Edge.

---

## 🔮 Future Improvements

- [ ] **Blog Section:** Integrated markdown-based blog for technical writing.
- [ ] **Dark/Light Mode Toggle:** Allow users to switch between the current dark theme and a clean light theme.
- [ ] **Multi-language Support:** i18n support for international reach.
- [ ] **Project Filtering:** Dynamic category filters (e.g., "Web", "Mobile", "API") for the projects section.
- [ ] **Admin Dashboard:** A lightweight local CMS interface to update `portfolio.json` without writing JSON syntax.
- [ ] **Analytics:** Integration with Google Analytics or Vercel Analytics for visitor insights.
- [ ] **Contact Form Improvements:** Add reCAPTCHA verification to prevent spam.

---

## 📄 License

© 2026 Md. Tanjimul Islam.  
All Rights Reserved.

---

## 👨‍💻 Author

**Name:** Md. Tanjimul Islam  
**University:** Ahsanullah University of Science and Technology  
**Department:** Computer Science & Engineering  
**GitHub:** [https://github.com/tanjim041](https://github.com/tanjim041)  
**Portfolio:** [https://tanjim041.github.io/Portfolio/](https://tanjim041.github.io/Portfolio/)
