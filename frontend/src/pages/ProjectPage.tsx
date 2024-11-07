import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TypewriterText from "@/components/custom/ui/typewriter_gpt_style";
import { CalendarDays, Github, Globe, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Project {
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

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const titleDelay = index * 100;
  const descDelay = titleDelay + 200;

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-zinc-200">
          <TypewriterText text={project.title} delay={titleDelay} />
        </CardTitle>
        <CardDescription className="text-base md:text-lg text-zinc-400">
          <TypewriterText text={project.description} delay={descDelay} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-zinc-300">{project.longDescription}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>{project.date}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={16} />
            <div className="flex gap-2 flex-wrap">
              {project.technologies.map(tech => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {project.links.github && (
            <Button
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700"
              onClick={() => window.open(project.links.github, '_blank')}
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </Button>
          )}
          {project.links.demo && (
            <Button
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700"
              onClick={() => window.open(project.links.demo, '_blank')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5; // Show 5 projects per page

  const allProjects = [
    {
      id: 1,
      title: "基於LoRaWAN 技術之電器管理系統",
      description: "遠端電器控制與監控系統",
      longDescription: "本系統透過LoRaWAN技術，針對大範圍的電器進行遠端控制與監控，包括電力消耗及健康狀況分析。透過資料庫及WebSocket實現即時管理，適用於大範圍的應用場景。",
      date: "2023-07 ~ 2023-11",
      technologies: ["LoRaWAN", "WebSocket", "React", "Node.js", "MongoDB"],
      links: {
        github: "https://github.com/yourusername/lorawan-project"
      }
    },
    {
      id: 2,
      title: "個人作品集網站",
      description: "使用 React 和 TypeScript 打造的個人網站",
      longDescription: "採用現代化的前端技術棧構建的個人網站，展示專業經歷、項目作品和技術部落格。整合了深色主題、響應式設計和流暢的動畫效果。",
      date: "2024-02 ~ Present",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      links: {
        github: "https://github.com/yourusername/portfolio",
        demo: "https://your-portfolio.com"
      }
    },
    {
      id: 3,
      title: "智慧校園資訊系統",
      description: "整合型校園管理與信息平台",
      longDescription: "為學校開發的綜合信息管理系統，包含學生信息管理、課程安排、成績管理等功能。採用微服務架構，確保系統的可擴展性和維護性。",
      date: "2023-03 ~ 2023-06",
      technologies: ["Java", "Spring Boot", "Vue.js", "MySQL", "Docker"],
      links: {
        github: "https://github.com/yourusername/smart-campus"
      }
    },
    {
      id: 4,
      title: "AI 輔助學習平台",
      description: "基於機器學習的個性化學習系統",
      longDescription: "運用AI技術分析學生學習行為，提供個性化學習建議和適應性練習。整合了自然語言處理技術，支持智能問答功能。",
      date: "2023-09 ~ 2024-01",
      technologies: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
      links: {
        github: "https://github.com/yourusername/ai-learning",
        demo: "https://ai-learning-demo.com"
      }
    },
    {
      id: 5,
      title: "區塊鏈投票系統",
      description: "安全可信的電子投票平台",
      longDescription: "基於區塊鏈技術開發的電子投票系統，確保投票過程的透明性和不可篡改性。支持多種投票方式，並提供實時結果統計。",
      date: "2023-01 ~ 2023-05",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
      links: {
        github: "https://github.com/yourusername/blockchain-voting",
        demo: "https://demo-voting.eth"
      }
    },
    {
      id: 6,
      title: "即時協作文檔系統",
      description: "多人即時編輯的文檔平台",
      longDescription: "支持多人同時編輯的協作文檔系統，實現了操作轉換算法(OT)，確保數據一致性。集成版本控制和權限管理功能。",
      date: "2022-08 ~ 2022-12",
      technologies: ["TypeScript", "Socket.IO", "MongoDB", "Redis", "Docker"],
      links: {
        github: "https://github.com/yourusername/collab-docs"
      }
    }
  ];

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="container max-w-6xl px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-200 mb-2">
              <TypewriterText text="我的專案" />
            </h1>
            <p className="text-zinc-400">
              <TypewriterText text="展示我的開發經驗和技術能力" delay={100} />
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200`}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        className={`${currentPage === i + 1 ? 'bg-zinc-600' : 'bg-zinc-800'} text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;