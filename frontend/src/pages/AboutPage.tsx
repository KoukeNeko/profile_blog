import {useEffect, useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase, // 經歷
  GraduationCap, // 學歷
  Award, // 證照
  LucideBookOpen, // 成績
  Globe, // 語言
  ExternalLink, // 外部連結
  Calendar, // 志願服務
  Code, // 專案
  Signature,
} from "lucide-react";
import TitleBar from "@/components/custom/ui/TitleBar";
import { ProfileCard, ProfileItem } from "@/components/custom/card/ProfileCard";
import { ProfileHeader } from "@/components/custom/card/ProfileHeader";


import { fetchProfileData } from "@/utils/api";

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileData();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-zinc-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-zinc-400">No profile data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <TitleBar title="關於我" subtitle="我是誰？我在哪？" />

      <ProfileHeader
        avatar={profile.avatar}
        name={profile.name}
        role={profile.role}
        location={profile.location}
        connections={profile.connections}
      />

      {/* 關於我 */}
      <ProfileCard icon={Signature} title="About">
        <p className="text-zinc-400 whitespace-pre-line">{profile.about}</p>
      </ProfileCard>

      {/* 工作經驗 */}
      <ProfileCard icon={Briefcase} title="Experience">
        {profile.experience.map((exp, index) => (
          <ProfileItem
            key={index}
            icon={Briefcase}
            title={exp.title}
            subtitle={exp.company}
            period={exp.period}
            location={exp.location}
            description={exp.description}
          />
        ))}
      </ProfileCard>

      {/* 教育背景 */}
      <ProfileCard icon={GraduationCap} title="Education">
        {profile.education.map((edu, index) => (
          <ProfileItem
            key={index}
            icon={GraduationCap}
            title={edu.school}
            subtitle={`${edu.degree} · ${edu.field}`}
            period={edu.period}
          />
        ))}
      </ProfileCard>

      {/* 證照與認證 */}
      <ProfileCard icon={Award} title="Licenses & Certifications">
        {profile.certifications.map((cert, index) => (
          <ProfileItem
            key={index}
            icon={Award}
            title={cert.name}
            subtitle={cert.issuer}
            period={`發行於 ${cert.issued}`}
            extra={
              <>
                {cert.credentialId && (
                  <p className="text-sm text-zinc-500">
                    證書編號：{cert.credentialId}
                  </p>
                )}
                {cert.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs text-neutral-700 border-neutral-700 bg-transparent"
                    onClick={() => window.open(cert.link, "_blank")}
                  >
                    See credential
                    <ExternalLink size={12} className="ml-1" />
                  </Button>
                )}
              </>
            }
          />
        ))}
      </ProfileCard>

      {/* 志願服務 */}
      <ProfileCard icon={Calendar} title="Volunteer Experience">
        {profile.volunteer.map((vol, index) => (
          <ProfileItem
            key={index}
            icon={Calendar}
            title={vol.role}
            subtitle={vol.organization}
            period={vol.period}
            description={vol.description}
          />
        ))}
      </ProfileCard>

      {/* 專案經驗 */}
      <ProfileCard icon={Code} title="Projects">
        {profile.projects.map((project, index) => (
          <ProfileItem
            key={index}
            icon={Code}
            title={project.name}
            period={project.period}
            description={project.description}
            extra={
              project.collaborators && (
                <div className="mt-2 text-zinc-500">
                  合作者：{project.collaborators.join(", ")}
                </div>
              )
            }
          />
        ))}
      </ProfileCard>

      {/* 成績 */}
      <ProfileCard icon={LucideBookOpen} title="Test Scores">
        {profile.scores.map((score, index) => (
          <ProfileItem
            key={index}
            icon={LucideBookOpen}
            title={score.test}
            subtitle={`分數：${score.score}`}
            period={score.date}
          />
        ))}
      </ProfileCard>

      {/* 語言能力 */}
      <ProfileCard icon={Globe} title="Languages">
        {profile.languages.map((lang, index) => (
          <ProfileItem
            key={index}
            icon={Globe}
            title={lang.name}
            subtitle={lang.level}
          />
        ))}
      </ProfileCard>
    </div>
  );
}
