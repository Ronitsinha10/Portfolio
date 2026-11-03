export interface Skill {
  name: string;
  level: number; // Percentage
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools & Technologies' | 'Database' | 'Tools';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'Education' | 'Internship' | 'Freelance' | 'Open Source';
  location: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | 'MERN' | 'Open Source' | 'Java' | 'UI/UX';
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  image: string; // Will generate or draw gorgeous SVG gradient card representations
  featured?: boolean;
}

export interface CodingProfile {
  platform: string;
  username: string;
  rating: string;
  rank: string;
  solvedCount: number;
  maxSolvedCount?: number; // for circular charts
  link: string;
  stats: { label: string; value: string | number }[];
}

export const projects: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'BTech Resume Builder',
    description: 'An interactive, ATS-optimized resume builder for engineering students featuring live preview, multi-theme customization, and PDF export.',
    longDescription: 'BTech Resume Builder is a modern, client-side web application designed to help engineering students build clean, professional, and ATS-compliant resumes. It features an intuitive multi-tab form editor across contact details, education, technical skills, projects, and certifications, complete with instant live preview, multiple color themes, local storage persistence, and print/PDF export styling.',
    category: 'UI/UX',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Vite', 'FontAwesome', 'LocalStorage'],
    features: [
      'Interactive live split-screen preview updating the resume layout in real time.',
      'ATS-compliant resume formatting with multiple color themes (Royal Blue, Emerald, Charcoal, Indigo).',
      'Dynamic form sections for Education, Experience, Technical Skills, Projects, and Certifications.',
      'Client-side persistence using LocalStorage to prevent data loss across sessions.',
      'Optimized print and 1-click PDF download styling with clean layout borders.'
    ],
    githubUrl: 'https://github.com/Ronitsinha10/resumebuilder',
    liveUrl: 'https://ronitsinha10.github.io/resumebuilder/',
    image: 'gradient-blue'
  },
  {
    id: 'proj2',
    title: 'Virtual Interview Coach',
    description: 'An AI-powered career acceleration platform featuring real-time conversational mock interviews, ATS resume analysis, and career roadmap planning.',
    longDescription: 'Virtual Interview Coach is a full-stack web application designed to help tech job seekers practice and excel in technical interviews. It integrates ElevenLabs real-time voice conversational agents for realistic mock interviews with instant performance feedback, automated ATS resume scoring, dynamic portfolio generation, interactive career roadmaps, and secure JWT authentication.',
    category: 'MERN',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'ElevenLabs API', 'Tailwind CSS', 'Framer Motion', 'JWT'],
    features: [
      'Real-time voice conversational AI mock interviews powered by ElevenLabs API.',
      'ATS resume analyzer providing instant match scoring and optimization tips.',
      'Dynamic developer portfolio generator to showcase projects and skills.',
      'Step-by-step career roadmap planner tailored for tech specializations.',
      'Secure JWT authentication, rate limiting, and persistent MongoDB database storage.'
    ],
    githubUrl: 'https://github.com/Ronitsinha10/Virtual-Interview-Coach',
    liveUrl: '',
    image: 'gradient-purple',
    featured: true
  },
  {
    id: 'proj3',
    title: 'Interactive Developer Portfolio',
    description: 'A responsive, modern personal developer portfolio built with React 19, TypeScript, and Tailwind CSS featuring dynamic GitHub & LeetCode stats.',
    longDescription: 'A sleek, modern developer portfolio designed to showcase engineering projects, technical milestones, and live GitHub and LeetCode activity. Built with React 19, TypeScript, Vite, and Tailwind CSS, featuring physics-based Framer Motion animations, dark/light theme switching, dynamic API integrations for contribution tracking, an interactive command palette (Ctrl+K), and an ATS-ready resume viewer.',
    category: 'UI/UX',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Lucide React'],
    features: [
      'Live API integration for real-time GitHub contributions, public repository count, and LeetCode solved statistics.',
      'Interactive Command Palette (Ctrl+K) for instant keyboard navigation across all portfolio sections.',
      'Fluid physics-based spring animations and micro-interactions powered by Framer Motion.',
      'Seamless dark and light theme switching with system preference detection and localStorage persistence.',
      'Fully responsive mobile-first architecture with custom modal overlays and clean typography.'
    ],
    githubUrl: 'https://github.com/Ronitsinha10/Portfolio',
    liveUrl: 'https://portfolio-eta-one-mn0ssb0zgz.vercel.app',
    image: 'gradient-cyan'
  }
];

export const portfolioData = {
  personalInfo: {
    name: 'Ronit Sinha',
    title: 'Software Engineer & Open Source Enthusiast',
    tagline: 'Building next-generation full-stack applications and contributing to the future of open-source software.',
    location: 'India',
    email: 'ronitsinha177@gmail.com',
    resumeUrl: '#', // Handled via modal download trigger
    typingRoles: ['Full Stack Developer'],
    socials: {
      github: 'https://github.com/Ronitsinha10',
      linkedin: 'https://www.linkedin.com/in/ronit-sinha-5b3b16329/',
      x: 'https://x.com/Ronit_Sinha10',
      twitter: 'https://x.com/Ronit_Sinha10',
      leetcode: 'https://leetcode.com/u/IHuDORGnqv/',
      email: 'mailto:ronitsinha177@gmail.com'
    }
  },
  get stats() {
    return [
      { label: 'Projects Completed', value: projects.length },
      { label: 'GitHub Contributions', value: 0 },
      { label: 'GitHub Repositories', value: 0 },
      { label: 'Coding Problems Solved', value: 0 }
    ];
  },
  skills: [
    // Frontend
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 92, category: 'Frontend' },
    { name: 'TypeScript', level: 88, category: 'Frontend' },
    { name: 'HTML5', level: 90, category: 'Frontend' },
    { name: 'CSS3', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
    // Backend
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Express.js', level: 85, category: 'Backend' },
    { name: 'REST APIs', level: 90, category: 'Backend' },
    // Databases
    { name: 'MongoDB', level: 85, category: 'Databases' },
    { name: 'MySQL', level: 80, category: 'Databases' },
    // Tools & Technologies
    { name: 'Git', level: 92, category: 'Tools & Technologies' },
    { name: 'GitHub', level: 95, category: 'Tools & Technologies' },
    { name: 'Docker', level: 78, category: 'Tools & Technologies' },
    { name: 'Linux', level: 80, category: 'Tools & Technologies' },
    { name: 'VS Code', level: 95, category: 'Tools & Technologies' }
  ] as Skill[],
  experience: [
    {
      id: 'exp1',
      role: 'B.Tech in Computer Science & Engineering',
      company: "Tula's University",
      period: '2024–2028',
      location: 'Dehradun, India',
      type: 'Education',
      description: [
        "Pursuing a Bachelor's degree in Computer Science & Engineering.",
        'Building a strong academic foundation in computer science and software engineering.',
        'Exploring modern technologies and continuously expanding my technical knowledge.'
      ]
    },
    {
      id: 'exp3',
      role: 'Full-Stack Development Projects',
      company: 'Personal Projects',
      period: '2025 – Present',
      location: 'Remote',
      type: 'Freelance',
      description: [
        'Developing web applications using the MERN stack.',
        'Building responsive user interfaces and integrating backend APIs.',
        'Exploring AI integration to create smarter, more useful applications.'
      ]
    },
    {
      id: 'exp4',
      role: 'Exploring AI Integration',
      company: 'Personal Learning',
      period: '2026 – Present',
      location: 'Remote',
      type: 'Open Source',
      description: [
        'Exploring AI APIs and integrating AI capabilities into web applications.',
        'Learning how to build intelligent, AI-powered software solutions.',
        'Experimenting with AI tools to enhance application functionality.'
      ]
    }
  ] as ExperienceItem[],
  projects,
  codingProfiles: [
    {
      platform: 'GitHub',
      username: 'Ronitsinha10',
      rating: 'Active Contributor',
      rank: 'Active Contributor',
      solvedCount: 9,
      maxSolvedCount: 50,
      link: 'https://github.com/Ronitsinha10',
      stats: [
        { label: 'Repositories', value: 3 },
        { label: 'Stars Earned', value: 3 },
        { label: 'Followers', value: 1 }
      ]
    },
    {
      platform: 'LeetCode',
      username: 'IHuDORGnqv',
      rating: 'Problem Solver',
      rank: 'Active Solver',
      solvedCount: 1,
      maxSolvedCount: 50,
      link: 'https://leetcode.com/u/IHuDORGnqv/',
      stats: [
        { label: 'Easy Solved', value: 1 },
        { label: 'Medium Solved', value: 0 },
        { label: 'Hard Solved', value: 0 }
      ]
    }
  ] as CodingProfile[],
  services: [
    {
      title: 'Full Stack Development',
      description: 'Building robust end-to-end web applications using MongoDB, Express, React, and Node.js (MERN) with secure JWT auth, real-time channels, and database performance tuning.',
      icon: 'Layers'
    },
    {
      title: 'Frontend Architecture',
      description: 'Developing high-performance, responsive React, Next.js, and TypeScript applications with gorgeous styles, custom interactive animations, and accessibility structures.',
      icon: 'Tv'
    },
    {
      title: 'Backend Engineering',
      description: 'Designing modular microservices and concurrent REST/GraphQL endpoints using Java Spring Boot or Node.js. Configuring Docker containers and PostgreSQL database setups.',
      icon: 'Cpu'
    },
    {
      title: 'UI/UX Integration',
      description: 'Translating designs (Framer, Figma) into responsive layouts utilizing Tailwind CSS and Framer Motion for premium, modern, fluid micro-interactions.',
      icon: 'Sparkles'
    }
  ]
};
