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