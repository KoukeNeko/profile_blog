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
  
  interface Experience {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    logo: string;
  }
  
  interface Education {
    school: string;
    degree: string;
    field: string;
    period: string;
    logo: string;
  }
  
  interface Certification {
    name: string;
    issuer: string;
    issued: string;
    logo: string;
    link?: string;
    credentialId?: string;
  }
  
  interface Volunteer {
    role: string;
    organization: string;
    period: string;
    description: string[];
  }
  
  interface Project {
    name: string;
    period: string;
    description: string;
    descriptionJa?: string;
    descriptionEn?: string;
    collaborators?: string[];
    technologies?: string[];
  }
  
  interface Score {
    test: string;
    score: string;
    date: string;
    logo: string;
  }
  
  interface Language {
    name: string;
    level: string;
  }