import { Achievement } from "@/types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: "ach-brototype-mern",
    title: "MERN Stack Development",
    issuer: "Brototype",
    date: "2024",
    shortDescription: "Completed professional training in full-stack web development with hands-on MERN stack development and real-world projects.",
    description: "Completed professional training in full-stack web development with hands-on MERN stack development and real-world projects covering HTML, CSS, modern JavaScript, Git, React.js, Node.js, Express.js, MongoDB, REST APIs, and JWT authentication.",
    skills: [
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JWT Authentication",
      "Git",
    ],
    logo: {
      url: "https://res.cloudinary.com/doyxte1wf/image/upload/v1787072866/Untitled_design_13_oe4d2e.png",
      alt: "Brototype Logo",
      width: 48,
      height: 48,
    },
  },
  {
    id: "ach-postman-expert",
    title: "Postman API Student Expert",
    issuer: "Postman",
    date: "Nov 2025",
    shortDescription: "Certified expert in API testing, documentation, and automation using Postman.",
    description: "Earned Postman API Student Expert badge by demonstrating mastery over RESTful API design, automated test scripts, environment variables, and mock servers.",
    skills: [
      "API Testing",
      "Postman",
      "REST APIs",
      "API Automation",
    ],
    logo: {
      url: "https://res.cloudinary.com/doyxte1wf/image/upload/v1787073018/Postman_1_yv1tan.png",
      alt: "Postman Logo",
      width: 48,
      height: 48,
    },
  },
];
