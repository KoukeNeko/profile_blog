import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Tag } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

// Text animation component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 5;
    const randomVariation = 15;

    const typeNextChar = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        const randomDelay = typingDelay + Math.random() * randomVariation;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(() => typeNextChar(), delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      <span className={`transition-opacity duration-200 ${
        isTypingComplete ? "opacity-100" : "opacity-80"
      }`}>
        {displayText}
      </span>
      {!isTypingComplete && (
        <span className="inline-block ml-1">
          <span className="text-zinc-300 animate-pulse block" style={{
            fontSize: '0.8em',
            lineHeight: 1,
            verticalAlign: 'middle',
            marginTop: '-2px'
          }}>
            &#11044;
          </span>
        </span>
      )}
    </span>
  );
};

interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

  const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
    const titleDelay = index * 100;
    const descDelay = titleDelay + 200;
  
    return (
      <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-zinc-200">
            <TypewriterText text={article.title} delay={titleDelay} />
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm md:text-base text-zinc-400">
            <TypewriterText text={article.description} delay={descDelay} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <CalendarDays size={14} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={14} />
              <div className="flex gap-1 flex-wrap">
                {article.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;
  
    const allArticles = [
        {
          id: 1,
          title: "使用 React 和 TypeScript 建立現代化網站",
          description: "本文將介紹如何使用 React 18 和 TypeScript 4 建立一個現代化的網站，包含最佳實踐和性能優化技巧。",
          date: "2024-03-15",
          readTime: "8 min",
          tags: ["React", "TypeScript", "Web Development"]
        },
        {
          id: 2,
          title: "深入理解 Next.js 13 的 App Router",
          description: "探索 Next.js 13 中新的 App Router 功能，了解其優勢以及如何在專案中充分利用它。",
          date: "2024-03-10",
          readTime: "10 min",
          tags: ["Next.js", "React", "Frontend"]
        },
        {
          id: 3,
          title: "Tailwind CSS 實戰技巧",
          description: "分享在實際專案中使用 Tailwind CSS 的各種技巧和經驗，讓你的開發更加高效。",
          date: "2024-03-05",
          readTime: "6 min",
          tags: ["CSS", "Tailwind", "Design"]
        },
        {
          id: 4,
          title: "深入淺出 Docker 容器化技術",
          description: "從基礎概念到實際應用，全面了解 Docker 容器化技術，以及如何在開發流程中有效運用。",
          date: "2024-03-01",
          readTime: "12 min",
          tags: ["Docker", "DevOps", "Container"]
        },
        {
          id: 5,
          title: "GraphQL API 設計最佳實踐",
          description: "探討 GraphQL API 設計中的關鍵考量因素，以及如何構建高效且易於維護的 API。",
          date: "2024-02-28",
          readTime: "9 min",
          tags: ["GraphQL", "API", "Backend"]
        },
        {
          id: 6,
          title: "前端效能優化指南",
          description: "從載入速度到運行效能，全方位提升前端應用的效能表現，包含實用技巧和工具推薦。",
          date: "2024-02-25",
          readTime: "11 min",
          tags: ["Performance", "Frontend", "Optimization"]
        },
        {
          id: 7,
          title: "React Server Components 實戰",
          description: "深入探討 React Server Components 的應用場景和實作方式，了解其優勢和使用時機。",
          date: "2024-02-20",
          readTime: "15 min",
          tags: ["React", "RSC", "Performance"]
        },
        {
          id: 8,
          title: "現代化 CSS 開發技巧",
          description: "介紹 CSS 最新特性和開發技巧，包含 Grid、Flexbox、CSS 變數等進階應用。",
          date: "2024-02-15",
          readTime: "7 min",
          tags: ["CSS", "Frontend", "Design"]
        },
        {
          id: 9,
          title: "微服務架構設計實踐",
          description: "探討微服務架構的設計原則、實作考量，以及在實際專案中的應用經驗分享。",
          date: "2024-02-10",
          readTime: "13 min",
          tags: ["Microservices", "Architecture", "Backend"]
        },
        {
          id: 10,
          title: "TypeScript 進階開發技巧",
          description: "深入探討 TypeScript 的進階特性和使用技巧，提升程式碼的型別安全性和可維護性。",
          date: "2024-02-05",
          readTime: "10 min",
          tags: ["TypeScript", "JavaScript", "Programming"]
        }
      ];
  
    // Calculate pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  
    // Handle page change
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top when page changes
    };
  
    return (
        <div className="flex justify-center w-full">
          <div className="container max-w-6xl px-4 py-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-200 mb-2">
                <TypewriterText text="我的文章" />
              </h1>
              <p className="text-zinc-400">
                <TypewriterText text="分享技術知識與學習心得" delay={100} />
              </p>
            </div>
    
            <div className="flex gap-6 mt-6">
              <div className="flex-grow max-w-4xl">
                <div className="space-y-4">
                  {currentArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
    
                {/* Pagination */}
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
              </div>
              
              {/* Sidebar */}
              <div className="w-72 hidden lg:block space-y-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-200">搜尋</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">搜尋功能即將推出...</p>
                  </CardContent>
                </Card>
    
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-200">分類</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">分類功能即將推出...</p>
                  </CardContent>
                </Card>
    
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-200">標籤雲</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">標籤雲功能即將推出...</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default BlogPage;