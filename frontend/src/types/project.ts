export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    date: string;
    technologies: string[];
    links: {
      github?: string;
      demo?: string;
    };
    image?: string;
  }
  
  export interface ProjectCardProps {
    project: Project;
    index: number;
  }