import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarDays, Clock, Tag } from "lucide-react"

// 模擬文章數據
const articles = [
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
]

export default function BlogPage() {
    return (
      <div className="flex justify-center w-full">
        <div className="container max-w-7xl px-4 py-6">
          {/* 使用 flex-col 在小螢幕上垂直排列，lg 以上使用 flex-row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左側文章列表 */}
            <div className="w-full lg:flex-grow lg:max-w-3xl order-1">
              <h1 className="text-2xl font-bold text-zinc-200 mb-6">最新文章</h1>
              <div className="space-y-4 lg:pr-4">
                {articles.map(article => (
                  <Card 
                    key={article.id} 
                    className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl text-zinc-200">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm md:text-base text-zinc-400">
                        {article.description}
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
                ))}
              </div>
            </div>
  
            {/* 右側工具欄 */}
            <div className="lg:w-80 w-full order-2 space-y-4">
              {/* 搜尋卡片 */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-200">搜尋</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">搜尋功能即將推出...</p>
                </CardContent>
              </Card>
  
              {/* 分類卡片 */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-200">分類</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">分類功能即將推出...</p>
                </CardContent>
              </Card>
  
              {/* 標籤雲卡片 */}
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
    )
  }