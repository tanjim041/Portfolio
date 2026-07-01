const portfolioData = {
  personal: {
    name: "Md. Tanjimul Islam",
    subtitle: "Computer Science & Engineering Graduate",
    titles: [
      "Problem Solver",
      "Programmer",
      "IT Operation Specialist",
      "Competitive Programmer",
      "Creative Thinker",
    ],
    about:
      "To develop a strong foundation in computer science and engineering, enhance technical proficiency, and cultivate problem-solving skills through a combination of academic coursework, hands-on projects, and continuous self-learning. Additionally, aim to actively contribute to collaborative projects, participate in coding competitions, and stay updated with emerging technologies to prepare for a successful and impactful career in the field.",
    university: "AUST",
    department: "CSE",
    location: "Mirpur-14, Dhaka-1206, Bangladesh",
    email: "tanjim433@gmail.com",
    phone: "01571270640",
    interests: "Travelling, Learning New things, Coding",
    nationality: "Bangladeshi",
    dob: "24th Sept 2003",
  },

  education: [
    {
      institution: "Ahsanullah University of Science and Technology",
      degree: "BSc in Computer Science & Engineering",
      score: "CGPA: 3.80",
      duration: "2018–2022",
      image: "/images/aust.jpg",
      description:
        "Learned advanced concepts in software engineering, algorithms, and system design while participating in programming contests and various technical clubs.",
    },
    {
      institution: "Adamjee Cantonment College",
      degree: "HSC",
      score: "GPA: 5.00",
      duration: "2015–2017",
      image: "/images/adamjee-college.jpg",
      description:
        "Excelled in science subjects, participating in extracurricular activities and building a strong foundation in mathematics and physics.",
    },
    {
      institution: "Adamjee Cantonment Public School",
      degree: "SSC",
      score: "GPA: 5.00",
      duration: "2006–2016",
      image: "/images/adamjee-school.jpg",
      description:
        "Completed secondary education with excellent grades, active participation in debate and science fairs.",
    },
  ],

  experience: [
    {
      role: "IT Operation Specialist",
      company: "CSE Department, AUST",
      duration: "Ongoing",
      image: "/images/experience-it.jpg",
      description: [
        "Maintaining Asset Register of all IIT equipment in IS workshop and Department.",
        "Providing technical support to the remote engineers for ongoing projects."
      ]
    }
  ],

  skills: {
    hard: [
      "C",
      "C++",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Object-Oriented Programming",
      "Git",
      "GitHub",
      "Languages: English, Hindi, Bengali"
    ],
    soft: [
      "Adaptable",
      "Positive Minded",
      "Creative Thinker",
      "Teamwork",
      "Time Management Quality",
      "Critical Thinking Ability",
    ],
  },

  projects: [
    {
      title: "Portfolio Website",
      image: "/images/project-portfolio.jpg",
      description: "A modern, premium, fully responsive personal portfolio website.",
      techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      githubLink: "https://github.com/tanjim041/Portfolio",
      liveLink: "#",
      status: "Completed",
      date: "Oct 2023",
    },
    {
      title: "E-Commerce API",
      image: "/images/project-ecommerce.jpg",
      description:
        "A RESTful API built for a scalable e-commerce platform with robust authentication.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT"],
      githubLink: "https://github.com",
      liveLink: "#",
      status: "In Progress",
      date: "Nov 2023",
    },
    {
      title: "Algorithm Visualizer",
      image: "/images/project-algo.jpg",
      description:
        "A web application that visualizes classic sorting and pathfinding algorithms.",
      techStack: ["React", "CSS", "Vite"],
      githubLink: "https://github.com",
      liveLink: "#",
      status: "Completed",
      date: "Aug 2023",
    },
  ],

  activities: [
    {
      title: "Programming Contests",
      image: "/images/activity-cp.jpg",
      description:
        "Regularly participate in codeforces and regional programming contests.",
    },
    {
      title: "University Clubs",
      image: "/images/activity-club.jpg",
      description:
        "Active member of the AUST CSE Society, organizing workshops and tech talks.",
    },
    {
      title: "Hackathons",
      image: "/images/activity-hackathon.jpg",
      description:
        "Participated in national level hackathons building innovative solutions under 24 hours.",
    },
  ],

  socials: [
    {
      platform: "Facebook",
      link: "https://www.facebook.com/tanjim041",
      icon: "facebook",
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/in/md-tanjimul-i-4b0154378/",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      link: "https://github.com/tanjim041",
      icon: "github",
    },
  ],

  contact: {
    address: "Mirpur-14\nDhaka-1206\nBangladesh",
    phone: "01571270640",
    email: "tanjim433@gmail.com",
  },
};

export default portfolioData;
