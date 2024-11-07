export interface Article {
    id: number;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: string[];
  }
  
  export interface ArticleCardProps {
    article: Article;
    index: number;
  }