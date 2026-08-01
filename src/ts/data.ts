// Single source of truth for site content.
// Edit this file to update what's rendered on the page.

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  linkedin: string;
  about: string;
}

export const profile: Profile = {
  name: "Ethan Dang",
  headline: "IT Consultant | AI & Automation Enthusiast | AI Agents for Enterprise Automation",
  location: "Belconnen, Australian Capital Territory, Australia",
  email: "ethandang2223@gmail.com",
  linkedin: "https://www.linkedin.com/in/hcnd/",
  about:
    "I'm focused on how AI can be practically applied to solve internal business challenges: streamlining workflows, accelerating delivery, and reducing operational overhead. My interest lies in AI solutions that embed directly into teams' day-to-day tools and processes, especially where compliance and efficiency matter. At AIQuinta, I support organisations exploring internal AI Agents to unblock projects faster and surface ROI sooner. I'm particularly drawn to use cases where AI isn't just a buzzword - but a working part of the business.",
};

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location?: string;
  description?: string;
  skills?: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Business Development Executive",
    org: "AIQuinta",
    period: "Jan 2026 – Present · 7 mos",
  },
  {
    role: "IT Consultant",
    org: "New Ocean IS Co., Ltd.",
    period: "Mar 2025 – Present · 1 yr 5 mos",
    description:
      "Lead the intersection of technology, business development, and client engagement, driving digital transformation projects and strategic partnerships across Australia. Manage end-to-end delivery of IT solutions — from client discovery to system design, development coordination, and implementation — bridging the gap between technology and business needs.",
    skills: ["IT Consulting", "Business Analysis", "Wireframing", "Business Partner Support"],
  },
  {
    role: "Electrical Salesperson",
    org: "Harvey Norman",
    period: "Nov 2023 – Present · 2 yrs 9 mos",
    location: "Belconnen, ACT, Australia · On-site",
    skills: ["Customer Service", "Retail Sales"],
  },
  {
    role: "Web Development Intern",
    org: "Self Plus Plus",
    period: "Dec 2024 – Apr 2025 · 5 mos",
    location: "Canberra, ACT, Australia · Hybrid",
    description:
      "Implemented front-end features and improved UI/UX using React.js, Next.js, and Tailwind CSS. Enhanced website functionality and optimized layouts, collaborated with cross-functional teams, used Git in an Agile environment, and debugged/optimized front-end code for performance and accessibility.",
    skills: ["TypeScript", "Node.js", "React.js", "MySQL"],
  },
  {
    role: "Kitchen Hand",
    org: "What The Pho",
    period: "Mar 2022 – Sep 2023 · 1 yr 7 mos",
    location: "Canberra, ACT, Australia · On-site",
    skills: ["Customer Service", "Kitchen Management"],
  },
];

export interface EducationItem {
  school: string;
  credential: string;
  period: string;
  description?: string;
}

export const education: EducationItem[] = [
  {
    school: "Opulence College",
    credential: "Diploma of Leadership and Management, Organizational Leadership",
    period: "Apr 2026 – Present",
  },
  {
    school: "QIBA",
    credential: "ACS Professional Year Program",
    period: "Feb 2024 – May 2025",
    description:
      "Hands-on experience and knowledge facilitating a seamless transition into the Information Technology job market.",
  },
  {
    school: "University of Canberra",
    credential: "Bachelor of Information Technology, Information Technology",
    period: "Feb 2022 – Mar 2024",
  },
  {
    school: "Quality Training Solutions",
    credential: "Diploma of Business (BSB50120)",
    period: "Jun 2021 – Dec 2021",
  },
];

export interface CertificationItem {
  name: string;
  issuer: string;
  issued: string;
}

export const certifications: CertificationItem[] = [
  { name: "Fostering a Growth Mindset in the Age of AI", issuer: "Skillsoft", issued: "Apr 2025" },
  { name: "AWS Developer Associate 2022: Integration Services", issuer: "Skillsoft", issued: "Mar 2025" },
  { name: "Agile Principles and Methodologies", issuer: "Skillsoft", issued: "Mar 2025" },
  { name: "Being an Effective Team Member", issuer: "Skillsoft", issued: "Jan 2025" },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Industry Knowledge",
    items: ["Business Development", "IT Consulting", "Business Analysis", "Wireframing", "Business Partner Support"],
  },
  {
    category: "Tools & Technologies",
    items: ["TypeScript", "React.js", "Node.js", "MySQL", "Front-End Development"],
  },
];

export const languages: { name: string; level: string }[] = [
  { name: "English", level: "Professional working proficiency" },
  { name: "Vietnamese", level: "Native or bilingual proficiency" },
];

export interface ExtracurricularItem {
  title: string;
  org: string;
  period: string;
  description?: string;
}

export const extracurricular: ExtracurricularItem[] = [
  {
    title: "President",
    org: "UC Vietnamese Student Society",
    period: "Nov 2022 – Nov 2023",
    description:
      "Organised a calendar of student events and built relationships with students, community groups and embassy representatives. Engaged and assisted new students to adapt to university life in Canberra.",
  },
  {
    title: "Volunteer",
    org: "Vietnam Centre",
    period: "Feb 2022 – Mar 2022",
    description: "Supported visitors during the \"Happy New Tet\" pop-up exhibition on Vietnamese heritage.",
  },
];
