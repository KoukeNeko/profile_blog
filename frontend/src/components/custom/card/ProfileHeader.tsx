import { Card, CardContent } from "@/components/ui/card";
import type { ProfileHeaderProps } from "@/types/ui";

export function ProfileHeader({
  avatar,
  name,
  role,
  location,
  connections,
}: ProfileHeaderProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-6 mt-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={avatar}
            alt={typeof name === "string" ? name : undefined}
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-zinc-200">{name}</h1>
            <p className="text-zinc-400">{role}</p>
            <p className="text-zinc-500 flex items-center gap-2">
              <span>{location}</span>
            </p>
            <p className="text-zinc-500">{connections}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
