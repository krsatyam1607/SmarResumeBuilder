export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  address: string;
  photo?: string;
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

export interface Skill {
  id: string;
  name: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  points: string[];
}

export interface Achievement {
  id: string;
  text: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
}

export type TemplateType = 'minimal' | 'classic' | 'modern';
