import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface ProfileCardProps {
  icon: LucideIcon;
  title: ReactNode;
  children: ReactNode;
}

export function ProfileCard({ icon: Icon, title, children }: ProfileCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-6">
      <CardHeader>
        <CardTitle className="text-xl text-zinc-200 flex items-center gap-2">
          <Icon size={20} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

// 可重用的個人資料項目元件
interface ProfileItemProps {
  icon: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  period?: ReactNode;
  location?: ReactNode;
  description?: string[] | string | ReactNode;
  extra?: ReactNode;
}

export function ProfileItem({ 
  icon: Icon, 
  title, 
  subtitle, 
  period, 
  location, 
  description,
  extra 
}: ProfileItemProps) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-md flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-zinc-400" />
        </div>
        <div>
          <h3 className="font-medium text-zinc-200">{title}</h3>
          {subtitle && <p className="text-zinc-400">{subtitle}</p>}
          {period && <p className="text-sm text-zinc-500">{period}</p>}
          {location && <p className="text-sm text-zinc-500">{location}</p>}
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside text-zinc-400 mt-2">
              {description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          ) : description && (
            <p className="text-zinc-400 mt-2">{description}</p>
          )}
          {extra}
        </div>
      </div>
    </div>
  );
}