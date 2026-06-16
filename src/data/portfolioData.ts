export interface Skill {
  name: string;
  level: number; // Percentage
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
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
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'Award' | 'Certification' | 'Hackathon' | 'Coding';
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

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  link: string;
}

export const portfolioData = {
  personalInfo: {
    name: 'Ronit Sinha',
    title: 'Software Engineer & Open Source Enthusiast',
    tagline: 'Building next-generation full-stack applications and contributing to the future of open-source software.',
    location: 'India',
    email: 'ronitsinha.dev@gmail.com',
    resumeUrl: '#', // Handled via modal download trigger
    typingRoles: [
      'Full Stack Developer',
      'MERN Stack Specialist',
      'Open Source Contributor',
      'Backend Architect',
      'Problem Solver'
    ],
    socials: {
      github: 'https://github.com/ronitsinha',
      linkedin: 'https://linkedin.com/in/ronitsinha',
      twitter: 'https://twitter.com/ronitsinha_dev',
      leetcode: 'https://leetcode.com/ronitsinha',
      codeforces: 'https://codeforces.com/profile/ronitsinha',
      email: 'mailto:ronitsinha.dev@gmail.com'
    }
  },
  stats: [
    { label: 'Projects Completed', value: 15 },
    { label: 'GitHub Contributions', value: 920 },
    { label: 'Open Source Commits', value: 120 },
    { label: 'Coding Problems Solved', value: 680 }
  ],
  skills: [
    // Frontend
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
    { name: 'JavaScript', level: 92, category: 'Frontend' },
    { name: 'HTML5', level: 90, category: 'Frontend' },
    { name: 'CSS3', level: 88, category: 'Frontend' },
    // Backend
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Express.js', level: 85, category: 'Backend' },
    { name: 'Spring Boot', level: 78, category: 'Backend' },
    { name: 'Java', level: 82, category: 'Backend' },
    { name: 'REST APIs', level: 90, category: 'Backend' },
    // Databases
    { name: 'MongoDB', level: 85, category: 'Database' },
    { name: 'PostgreSQL', level: 84, category: 'Database' },
    { name: 'MySQL', level: 80, category: 'Database' },
    { name: 'Redis', level: 75, category: 'Database' },
    // Tools
    { name: 'Git', level: 92, category: 'Tools' },
    { name: 'GitHub', level: 95, category: 'Tools' },
    { name: 'Docker', level: 78, category: 'Tools' },
    { name: 'Linux', level: 80, category: 'Tools' },
    { name: 'Postman', level: 88, category: 'Tools' },
    { name: 'AWS', level: 72, category: 'Tools' },
    { name: 'VS Code', level: 95, category: 'Tools' }
  ] as Skill[],
  experience: [
    {
      id: 'exp2',
      role: 'Full Stack Software Engineer Intern',
      company: 'InnovateTech Labs',
      period: 'Jan 2025 - Apr 2025',
      location: 'Bangalore, India (Hybrid)',
      type: 'Internship',
      description: [
        'Developed modular React microfrontends optimized for performance and responsive scaling.',
        'Implemented scalable RESTful endpoints using Node.js/Express and MongoDB integration.',
        'Decreased bundle loading sizes by 25% using dynamic chunking and component lazy loading.'
      ]
    },
    {
      id: 'exp3',
      role: 'Freelance Full Stack Web Developer',
      company: 'Independent Contracts',
      period: 'Jun 2024 - Dec 2024',
      location: 'Remote',
      type: 'Freelance',
      description: [
        'Designed custom SaaS landing pages and full-featured ecommerce modules for multiple startups.',
        'Built interactive portals using React, Tailwind CSS, Framer Motion, and Stripe checkout services.',
        'Boosted search engine optimization (SEO) rankings, increasing client web traffic by 40%.'
      ]
    },
    {
      id: 'exp4',
      role: 'B.Tech in Computer Science & Engineering',
      company: 'Technical University',
      period: '2022 - 2026 (Expected)',
      location: 'India',
      type: 'Education',
      description: [
        'Specializing in Data Structures, Algorithms, DBMS, Operating Systems, and Web Engineering.',
        'Maintaining a strong academic standing (CGPA: 9.1/10).',
        'Lead developer for the annual Hackathon Organization Management Portal.'
      ]
    }
  ] as ExperienceItem[],
  projects: [
    {
      id: 'proj1',
      title: 'DevSphere SaaS Platform',
      description: 'A cloud-based real-time collaborative workspace for developer teams to plan, design, and write documentation.',
      longDescription: 'DevSphere is an end-to-end workspace mirroring Linear and Notion. It supports real-time cursor tracking, document syncing, rich text editing, and automated task pipelines with Kanban boards. Built using React, Tailwind, Socket.io, Express, and MongoDB.',
      category: 'MERN',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Real-time document synchronization with collaborative editor.',
        'Interactive Kanban boards with drag-and-drop animations.',
        'Subtle command palette (Ctrl+K) for instant keyboard shortcuts.',
        'Comprehensive activity feeds and role-based permissions.'
      ],
      githubUrl: 'https://github.com/ronitsinha/devsphere-saas',
      liveUrl: 'https://devsphere-workspace.vercel.app',
      image: 'gradient-blue'
    },
    {
      id: 'proj2',
      title: 'Aura UI Design Engine',
      description: 'An interactive, responsive UI builder component toolkit utilizing Tailwind and Framer Motion.',
      longDescription: 'Aura UI lets users customize, live-preview, and export React-Tailwind code blocks for premium layouts, showcasing luxury typography and fluid animation effects. Built with Vite and TypeScript.',
      category: 'UI/UX',
      techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
      features: [
        'Dynamic interactive visual controls for layouts.',
        'Instantly copy JSX/TSX and CSS tailwind classes.',
        'Responsiveness testing sandbox matching variable dimensions.',
        'Custom interactive physics transitions and spring configuration tools.'
      ],
      githubUrl: 'https://github.com/ronitsinha/aura-ui-engine',
      liveUrl: 'https://aura-ui.dev',
      image: 'gradient-purple'
    },
    {
      id: 'proj3',
      title: 'Distributed Logs Processor',
      description: 'A lightning-fast, concurrent CLI and server logs parsing architecture written in Java.',
      longDescription: 'A custom distributed processing engine utilizing Java Virtual Threads (Project Loom) to slice, parse, and filter terrabytes of web server logs concurrently. Integrates a Spring Boot statistics endpoint dashboard.',
      category: 'Java',
      techStack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'Linux CLI'],
      features: [
        'Concurrently processes over 100,000 logs per second on consumer hardware.',
        'Leverages Java virtual threads for light concurrent processes.',
        'Robust metrics dashboard exposing server requests, error thresholds, and system loads.',
        'Docker-compose deployment orchestrator for database and service instances.'
      ],
      githubUrl: 'https://github.com/ronitsinha/concurrent-log-processor',
      liveUrl: 'https://log-metrics.ronitsinha.dev',
      image: 'gradient-orange'
    },
    {
      id: 'proj4',
      title: 'OpenGit Contribution Visualizer',
      description: 'A tool parsing GitHub APIs to render interactive 3D graphs and progress indicators of open-source contributions.',
      longDescription: 'An analytical dashboard visualizing user pull requests, open commits, and issues resolved with stunning charts and animations.',
      category: 'Open Source',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'GitHub GraphQL API'],
      features: [
        'Authenticates and pulls authentic contribution histories.',
        'Stunning layouts built with responsive SVG and HSL gradient mappings.',
        'Tracks active repository progress and details of accepted pull requests.'
      ],
      githubUrl: 'https://github.com/ronitsinha/opengit-visuals',
      liveUrl: 'https://opengit-viz.dev',
      image: 'gradient-emerald'
    },
    {
      id: 'proj5',
      title: 'Nova Commerce Hub',
      description: 'Full stack digital storefront and customer admin portal featuring a Stripe micro-checkout integration.',
      longDescription: 'Nova is a modern B2C ecommerce system. It includes complex dashboarding, product inventory charts, secure user management, and seamless multi-step checkouts. Built using React, Express, MongoDB, and Tailwind.',
      category: 'Full Stack',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Tailwind CSS', 'Chart.js'],
      features: [
        'Seamless integration with the Stripe checkout flow.',
        'Interactive analytics dashboard displaying sales statistics.',
        'Optimized responsive grid interface with sorting, tagging, and filtering controls.'
      ],
      githubUrl: 'https://github.com/ronitsinha/nova-hub',
      liveUrl: 'https://nova-commerce.dev',
      image: 'gradient-cyan'
    }
  ] as ProjectItem[],
  codingProfiles: [
    {
      platform: 'GitHub',
      username: 'ronitsinha',
      rating: 'Active Contributor',
      rank: 'Top 5%',
      solvedCount: 920,
      maxSolvedCount: 1000,
      link: 'https://github.com/ronitsinha',
      stats: [
        { label: 'Repositories', value: 42 },
        { label: 'Stars Earned', value: 180 },
        { label: 'Followers', value: 85 }
      ]
    },
    {
      platform: 'LeetCode',
      username: 'ronit_sinha_99',
      rating: '1854 Rating (Knight)',
      rank: 'Top 4.2%',
      solvedCount: 680,
      maxSolvedCount: 1500,
      link: 'https://leetcode.com/ronit_sinha_99',
      stats: [
        { label: 'Easy Solved', value: 210 },
        { label: 'Medium Solved', value: 380 },
        { label: 'Hard Solved', value: 90 }
      ]
    },
    {
      platform: 'Codeforces',
      username: 'ronitsinha',
      rating: '1382 Rating (Pupil)',
      rank: 'Specialist Path',
      solvedCount: 120,
      maxSolvedCount: 500,
      link: 'https://codeforces.com/profile/ronitsinha',
      stats: [
        { label: 'Max Rating', value: 1395 },
        { label: 'Contests Done', value: 24 },
        { label: 'Rank', value: 'Pupil' }
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
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Sarah Jenkins',
      role: 'Co-Founder & CEO',
      company: 'AeroLaunch Systems',
      text: 'Ronit delivered our SaaS frontend within tight timelines. His knowledge of React, Tailwind, and layout physics exceeded our expectations. The attention to detail is outstanding.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5
    },
    {
      id: 't2',
      name: 'Alexander Rostova',
      role: 'Lead Dev / Mentor',
      company: 'OpenSubsystem Core',
      text: 'During our collaboration, Ronit worked tirelessly on refactoring our core processing engine. His Java skills and proactive GitHub pull request contributions are top-tier.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5
    },
    {
      id: 't3',
      name: 'Dhruv Sharma',
      role: 'Product Director',
      company: 'Cognitive Digital',
      text: 'Collaborating with Ronit was seamless. He has a rare blend of strong problem-solving skills (evident from LeetCode metrics) and visual styling talent for custom interfaces.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5
    }
  ] as TestimonialItem[],
  blogs: [
    {
      id: 'b1',
      title: 'Deep Dive: Concurrent Processing in Java with Virtual Threads',
      excerpt: 'Exploring how Java 21 Project Loom transforms backend scalability, contrasting platform threads with lightweight virtual threads using visual performance tests.',
      date: 'May 12, 2026',
      readTime: '6 min read',
      category: 'Java Backend',
      tags: ['Java 21', 'Spring Boot', 'Concurrency'],
      link: '#blog1'
    },
    {
      id: 'b2',
      title: 'Mastering Framer Motion: Creating Physics-Based Fluid Page Animations',
      excerpt: 'A comprehensive guide to leveraging Framer Motion springs, drag gestures, and layout orchestration to create luxury SaaS-level micro-interactions.',
      date: 'April 20, 2026',
      readTime: '8 min read',
      category: 'Frontend Development',
      tags: ['React', 'Framer Motion', 'Tailwind'],
      link: '#blog2'
    },
    {
      id: 'b3',
      title: 'Demystifying Git: Under the Hood of Commits, Branches, and Trees',
      excerpt: 'Understanding the low-level Git storage layout, index files, and tree object pointers to master git troubleshooting and branching workflows.',
      date: 'March 05, 2026',
      readTime: '5 min read',
      category: 'Git & DevOps',
      tags: ['Git', 'DevOps', 'Command Line'],
      link: '#blog3'
    }
  ] as BlogItem[],
  achievements: [
    {
      id: 'ach1',
      title: 'Dean\'s List for Academic Excellence',
      issuer: 'Technical University',
      date: '2023, 2024, 2025',
      description: 'Awarded academic honors for ranking in the top 3% of the computer science cohort across multiple semesters.',
      category: 'Award'
    },
    {
      id: 'ach2',
      title: 'LeetCode Knight Badge',
      issuer: 'LeetCode Platform',
      date: '2025',
      description: 'Attained a rating of 1854, placing in the top 4% of competitive programmers globally, with 680+ coding tasks solved.',
      category: 'Coding'
    },
    {
      id: 'ach3',
      title: 'Hackathon Finalist - Smart Solutions',
      issuer: 'National Technology Challenge',
      date: '2024',
      description: 'Designed a real-time smart grid power usage tracking model using React and Node, securing top 5 spots among 300 competing engineering teams.',
      category: 'Hackathon'
    },
    {
      id: 'ach4',
      title: 'Advanced React Certification',
      issuer: 'Frontend Architects',
      date: '2024',
      description: 'Demonstrated proficiency in server components, performance debugging, virtualization, hook creation, and bundle optimization.',
      category: 'Certification'
    }
  ] as AchievementItem[]
};
