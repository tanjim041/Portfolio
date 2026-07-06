const portfolioData = {
  personal: {
    name: "Md. Tanjimul Islam",
    subtitle: "Computer Science & Engineering Student",
    titles: [
      "Problem Solver",
      "Programmer",
      "Gamer",
      "Explorer",
      "Competitive Programmer",
      "Creative Thinker",
    ],
    about:
      "I am Md. Tanjimul Islam, a Computer Science & Engineering student at Ahsanullah University of Science and Technology (AUST). I am passionate about software development, competitive programming, problem solving, and learning modern technologies. I enjoy exploring new places, playing games, solving coding challenges, and continuously improving my technical skills. I believe in teamwork, creativity, discipline, and lifelong learning.",
    university: "AUST",
    department: "CSE",
    location: "Dhaka-1206, Bangladesh",
    email: "islamtanjim316@gmail.com",
    phone: "01571270640",
    interests: "Travelling, Learning New things, Coding",
    nationality: "Bangladeshi",
    dob: "24th Sept 2003",
  },

  education: [
    {
      institution: "Ahsanullah University of Science and Technology",
      degree: "BSc in Computer Science & Engineering",
      score: "CGPA: 3.3+",
      duration: "2023-Present",
      image: "/images/AUST.jpeg",
      description:
        "Learned advanced concepts in software engineering, algorithms, and system design while participating in programming contests and various technical clubs.",
    },
    {
      institution: "Adamjee Cantonment College",
      degree: "HSC",
      score: "GPA: 5.00",
      duration: "2022",
      image: "/images/adamjee-college.jpg",
      description:
        "Excelled in science subjects, participating in extracurricular activities and building a strong foundation in mathematics and physics.",
    },
    {
      institution: "Adamjee Cantonment Public School",
      degree: "SSC",
      score: "GPA: 5.00",
      duration: "2020",
      image: "/images/adamjee-school.jpg",
      description:
        "Completed secondary education with excellent grades, active participation in debate and science fairs.",
    },
  ],

  experience: [
    {
      role: "Software Engineering Intern (Seeking Opportunities)",
      company: "Open to Internship Opportunities",
      duration: "Available",
      image: "/images/experience-it.jpg",
      description: [
        "Currently seeking internship opportunities in Software Engineering, Full-Stack Development, Backend Development, AI, or Machine Learning.",
        "Passionate about software development and eager to gain real-world industry experience through internships, collaborative projects, and open-source contributions.",
        "Strong foundation in React, Node.js, Flutter, C#, Python, Java, C++, SQL, and modern software engineering practices.",
        "Enjoy collaborating in team environments, solving challenging problems, and continuously learning new technologies.",
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
      title: "BacheLORE",
      image: "/images/project-bachelore.jpg",
      description:
        "Collaborated on a full-stack web platform built to simplify independent living for students and young professionals in Bangladesh. The platform combines shared-flat listings, maid hiring, a secondhand marketplace, expense tracking, and tuition search into one application. Contributed to frontend development and feature integration as part of a multi-person team, with the application deployed on Vercel.",
      techStack: ["React", "JavaScript", "Node.js", "CSS"],
      githubLink: "https://github.com/tanjim041/BacheLORE",
      liveLink: null,
      status: "Completed",
      date: null,
    },
    {
      title: "AUSThir App",
      image: "/images/project-austhir.jpg",
      description:
        "Developed a cross-platform mobile application for the Software Development-II (SD-II) lab course. Worked collaboratively to design and implement the application's core features using Flutter, targeting Android, iOS, and desktop platforms.",
      techStack: ["Flutter", "Dart", "C++"],
      githubLink: "https://github.com/tanjim041/AUSThir-App",
      liveLink: null,
      status: "Completed",
      date: null,
    },
    {
      title: "Smart Office Monitor",
      image: "/images/project-smart-office.jpg",
      description:
        "Built a real-time IoT office monitoring system as part of a four-member team during a national Techathon competition. Contributed to a live dashboard displaying room-by-room power usage, automated after-hours alerts, and usage analytics. Helped integrate a Discord bot that provides real-time status queries and proactive alert notifications.",
      techStack: ["React", "Node.js", "Express", "Tailwind CSS", "Discord.js"],
      githubLink: "https://github.com/sucksatcse/techathon-nationals-smart-office-monitor",
      liveLink: null,
      status: "Techathon Nationals",
      date: null,
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
      title: "Games",
      image: "/images/Games.jpg",
      description:
        "A collection of the competitive and casual games I have played, including my gaming achievements, profiles, ranks, and statistics.",
      link: "/games",
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
    {
      platform: "Codeforces",
      link: "https://codeforces.com/profile/tanjim999",
      icon: "codeforces",
    },
  ],

  contact: {
    address: "Mirpur-14\nDhaka-1206\nBangladesh",
    phone: "01571270640",
    email: "islamtanjim316@gmail.com",
  },
};

export default portfolioData;
