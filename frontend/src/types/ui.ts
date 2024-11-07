import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface TypewriterProfileItemProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  period?: string;
  location?: string;
  description?: string | string[];
  extra?: ReactNode;
  index?: number;
  baseDelay?: number;
}

export interface ProfileCardProps {
  icon: LucideIcon;
  title: ReactNode;
  children: ReactNode;
}
// 可重用的個人資料項目元件
export interface ProfileItemProps {
  icon: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  period?: ReactNode;
  location?: ReactNode;
  description?: ReactNode;
  extra?: ReactNode;
}

export interface ProfileHeaderProps {
  avatar: string;
  name: ReactNode;
  role: ReactNode;
  location: ReactNode;
  connections: string;
}

export interface TitleBarProps {
    title: ReactNode;
    subtitle?: ReactNode;
    /** 是否啟用打字機效果 */
    enableTypewriter?: boolean;
    /** 主標題打字機效果延遲時間 (毫秒) */
    titleDelay?: number;
    /** 副標題打字機效果延遲時間 (毫秒) */
    subtitleDelay?: number;
    /** 自定義主標題樣式 */
    titleClassName?: string;
    /** 自定義副標題樣式 */
    subtitleClassName?: string;
  }