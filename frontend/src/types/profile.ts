// /src/types/profile.ts
export interface Profile {
    name: string;
    avatar: string;
    role: string;
    location: string;
    connections: string;
    about: string;
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    volunteer: Volunteer[];
    projects: Project[];
    scores: Score[];
    languages: Language[];
  }
  
  export interface Experience {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    logo: string;
  }
  
  export interface Education {
    school: string;
    degree: string;
    field: string;
    period: string;
    logo: string;
  }
  
  export interface Certification {
    name: string;
    issuer: string;
    issued: string;
    logo: string;
    link?: string;
    credentialId?: string;
  }
  
  export interface Volunteer {
    role: string;
    organization: string;
    period: string;
    description: string[];
  }
  
  export interface Project {
    name: string;
    period: string;
    description: string;
    descriptionJa?: string;
    descriptionEn?: string;
    collaborators?: string[];
    technologies?: string[];
  }
  
  export interface Score {
    test: string;
    score: string;
    date: string;
    logo: string;
  }
  
  export interface Language {
    name: string;
    level: string;
  }