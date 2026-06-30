# Tanjimul Islam - Developer Portfolio

A modern, premium, fully responsive, production-ready personal portfolio website built for Md. Tanjimul Islam, showcasing education, technical skills, projects, and extracurricular activities.

## 🌟 Features
- **Modern UI/UX**: Built with Tailwind CSS focusing on premium developer aesthetic (dark theme, glassmorphism, glowing accents).
- **Dynamic Content**: All data (bio, skills, projects, etc.) is loaded from a single `data/portfolio.json` file.
- **Animations**: Integrated AOS (Animate on Scroll), smooth scrolling, interactive particle background, and typing effects.
- **Responsive**: Fully responsive across mobile, tablet, and desktop viewports.
- **Contact Form**: Functional contact form powered by Express and Nodemailer.
- **Embedded CV**: Integrated PDF viewer for the resume.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templates), Tailwind CSS
- **Styling/Animations**: Tailwind CSS, AOS, CSS Keyframes, Particles.js
- **Icons**: Lucide Icons
- **Security & Optimization**: Helmet, Compression, Morgan

## 📁 Folder Structure
```text
portfolio/
├── data/
│   └── portfolio.json       # All dynamic content goes here
├── public/
│   ├── css/                 # Tailwind input/output CSS
│   ├── js/                  # Custom frontend scripts
│   ├── images/              # Images (projects, profile, etc.)
│   └── cv/                  # CV PDF files
├── routes/
│   ├── index.js             # Home page route
│   └── contact.js           # Contact form API route
├── utils/
│   └── mail.js              # Nodemailer configuration
├── views/
│   ├── index.ejs            # Main layout
│   └── partials/            # UI components (hero, about, projects, etc.)
├── server.js                # Express app entry point
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Scripts and dependencies
```

## 🚀 Installation & Running Locally

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your email credentials for the contact form:
   ```env
   PORT=3000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_RECEIVER=your_email@gmail.com
   ```

4. **Run the Development Server**:
   This script runs both Tailwind CSS in watch mode and Nodemon for the Node server.
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:3000`

## 🎨 Customization Guide
- **Update Content**: Open `data/portfolio.json` to add new projects, update your bio, or change your skills. The website will automatically update.
- **Update Images**: Place your images in `public/images/` and reference their paths in the JSON file.
- **Update CV**: Replace `public/cv/Tanjim_CV.pdf` with your actual PDF resume.
- **Change Colors**: Modify the theme configuration in `tailwind.config.js`.

## 📦 Deployment
Before deploying to production (e.g., Render, Heroku, Vercel), build the minified CSS:
```bash
npm run build
```
Then, you can start the production server with:
```bash
npm start
```

## 📄 License
© 2026 Md. Tanjimul Islam. All Rights Reserved.
