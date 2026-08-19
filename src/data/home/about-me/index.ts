import { AboutData } from "@/types/about";

export const aboutData: AboutData = {
  profile: {
    name: "Mohammed Nihal K",
    role: "MERN Stack Developer • Engineer • Builder",
    location: "India (UTC+5:30)",
    avatarUrl: "https://res.cloudinary.com/doyxte1wf/image/upload/v1787069442/NIHAL-MNK_f2epho.png",
    availableForHire: true,
    email: "mohammednihal.dev@gmail.com",
    socials: {
      github: "https://github.com/NIHALMNK",
      linkedin: "https://www.linkedin.com/in/mohammednihalk6061/",
      instagram: "https://instagram.com/",
    },
  },
  summary: {
    title: "Engineering from Zero to One",
    content: [
      "I am a full-stack engineer specialized in building scalable, production-grade web applications and distributed architectures using the MERN stack and modern TypeScript ecosystem.",
      "My core focus spans the entire software engineering lifecycle—from system architecture, database modeling, and real-time communication protocols (WebRTC/Socket.IO) to fluid UI execution, accessibility, and automated cloud deployments.",
      "I prioritize shipping maintainable, user-centric software that solves tangible problems over getting lost in superficial complexity.",
    ],
    highlights: [
      { label: "Core Specialization", value: "MERN Stack & Next.js" },
      { label: "Architecture Focus", value: "Clean Architecture & DI" },
      { label: "Real-Time Systems", value: "WebRTC & WebSockets" },
      { label: "Engineering Mindset", value: "Zero-to-One Product Delivery" },
    ],
  },
  education: [
    {
      id: "edu-brototype",
      institution: "Brototype",
      degree: "MERN Stack Web Development Bootcamp",
      field: "Full-Stack Software Engineering",
      period: "2023 – 2024",
      location: "Kerala, India",
      description:
        "Intensive professional engineering training program covering modern JavaScript, React.js, Node.js, Express, MongoDB, data structures, algorithms, MVC architecture, Git workflows, and real-world production deployments.",
    },
    {
      id: "edu-higher-secondary",
      institution: "Kerala State Board",
      degree: "Higher Secondary Education",
      field: "Science & Computer Science",
      period: "2021 – 2023",
      location: "Kerala, India",
      description:
        "Foundational coursework in computer science principles, mathematics, logic, and problem-solving.",
    },
  ],
  experience: [
    {
      id: "exp-mern-dev",
      role: "MERN Stack Developer",
      company: "Independent Software Engineering & Freelance",
      period: "2024 – Present",
      location: "Kerala, India",
      description:
        "Designing, architecting, and engineering production-grade full-stack web applications, real-time consultation platforms, and e-commerce systems.",
      responsibilities: [
        "Architected Kizuna, a high-concurrency fitness coaching marketplace with WebRTC video consultations, Socket.IO messaging, and Redis session caching.",
        "Engineered TACTICS, an e-commerce platform with MVC architecture, role-based access control (RBAC), and automated AWS EC2 cloud deployment.",
        "Built modular backend microservices implementing Dependency Injection, Repository Pattern, and strict TypeScript types for reliable runtime operation.",
        "Designed accessible, high-performance responsive frontend interfaces with Next.js Server Components, Tailwind CSS, and GSAP animations.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "AWS EC2",
        "Redis",
        "WebRTC",
        "Socket.IO",
      ],
    },
  ],
};
