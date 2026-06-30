# Tanjimul Islam - Developer Portfolio

![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success?style=for-the-badge&logo=github)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## About

I built this portfolio to showcase my software projects, technical skills, and academic background in one place. I wanted a space to experiment with CSS frameworks and static site generation, creating a simple but effective website that I can maintain and update easily as I gain more experience.

## Live Demo

**Portfolio Website:**  
[https://tanjim041.github.io/Portfolio/](https://tanjim041.github.io/Portfolio/)

**Repository:**  
[https://github.com/tanjim041/Portfolio](https://github.com/tanjim041/Portfolio)

## Preview

*(Add screenshots here)*

## Features

- Responsive layout
- Dark theme
- Dynamic portfolio data loaded from JSON
- Scroll animations and typing effect
- Interactive particle background
- Education timeline
- Skills section
- Project showcase with tags and links
- Working static contact form
- Embedded CV viewer

## Technology Stack

**Frontend**
- HTML5
- Tailwind CSS
- JavaScript (ES6+)

**Libraries**
- AOS (Animate on Scroll)
- Particles.js
- Lucide Icons

**Data & Hosting**
- JSON (for portfolio content)
- GitHub Pages
- Web3Forms (for the contact form)

## Folder Structure

```text
Portfolio/
├── data/
│   └── portfolio.json       
├── public/
│   ├── css/
│   │   ├── input.css        
│   │   └── style.css        
│   ├── js/
│   │   └── main.js          
│   ├── images/              
│   └── cv/                  
├── views/
│   ├── index.ejs            
│   └── partials/            
├── index.html               
├── package.json             
├── tailwind.config.js       
├── build.js                 
├── updatePaths.js           
└── README.md                
```

## Installation

To clone and set up the project locally:

```bash
git clone https://github.com/tanjim041/Portfolio.git
cd Portfolio
npm install
```

## Local Development

The project uses a custom Node script to compile EJS templates and JSON data into a static HTML file.

To start local development with hot-reloading for Tailwind CSS:

```bash
npm run dev
```

You can then serve the root directory using an extension like Live Server in VS Code, or by running:

```bash
npx serve .
```

## Deployment

The project is hosted as a static site on GitHub Pages. Pushing changes to the `main` branch automatically updates the deployed site. 

Before pushing, ensure you build the final static assets:

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push origin main
```

## Customization

You can update the portfolio content without editing HTML:
- **Update Content:** Edit `data/portfolio.json`.
- **Change Images:** Place new images in `public/images/` and update paths in the JSON.
- **Update CV:** Replace `public/cv/Tanjim_CV.pdf` with your updated resume.
- **Update Colors:** Modify the theme block in `tailwind.config.js`.
- **Contact Form:** Update the hidden `access_key` input in `views/partials/contact.ejs` with your own Web3Forms key.

## Future Improvements

- Add a markdown-based blog
- Add project search and filtering
- Improve accessibility and keyboard navigation
- Add a dark/light mode toggle
- Add more project screenshots

## License

© 2026 Md. Tanjimul Islam
All Rights Reserved.

## Author

**Name:** Md. Tanjimul Islam  
**University:** Ahsanullah University of Science and Technology  
**Department:** Computer Science & Engineering  
**GitHub:** [https://github.com/tanjim041](https://github.com/tanjim041)  
**Portfolio:** [https://tanjim041.github.io/Portfolio/](https://tanjim041.github.io/Portfolio/)
