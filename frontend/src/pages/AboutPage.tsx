import { useEffect, useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Award,
  LucideBookOpen,
  Globe,
  ExternalLink,
  Calendar,
  Code,
  Signature,
  LucideIcon,
} from "lucide-react";
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style";
import TitleBar from "@/components/custom/ui/TitleBar";
import { ProfileCard, ProfileItem } from "@/components/custom/card/ProfileCard";
import { ProfileHeader } from "@/components/custom/card/ProfileHeader";
import type { Profile, Experience, Education, Certification, Volunteer, Project, Score, Language } from "@/types/profile";

import { fetchProfileData } from "@/utils/api";

interface TypewriterProfileItemProps {
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



const TypewriterProfileItem: React.FC<TypewriterProfileItemProps> = ({
  icon: Icon,
  title,
  subtitle,
  period,
  location,
  description,
  extra,
  index = 0,
  baseDelay = 0
}) => {
  const titleDelay = baseDelay + index * 100;
  const subtitleDelay = titleDelay + 100;
  const periodDelay = subtitleDelay + 100;
  const descriptionDelay = periodDelay + 100;

  const renderDescription = () => {
    if (!description) return null;
    if (Array.isArray(description)) {
      return (
        <TypewriterText 
          text={description.join('\n')} 
          delay={descriptionDelay} 
        />
      );
    }
    return <TypewriterText text={description} delay={descriptionDelay} />;
  };

  return (
    <ProfileItem
      icon={Icon}
      title={<TypewriterText text={title} delay={titleDelay} />}
      subtitle={subtitle && <TypewriterText text={subtitle} delay={subtitleDelay} />}
      period={period && <TypewriterText text={period} delay={periodDelay} />}
      location={location && <TypewriterText text={location} delay={periodDelay} />}
      description={renderDescription()}
      extra={extra}
    />
  );
};

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
          <TypewriterText 
            text="Loading Profile Data..." 
            typingDelay={50}
            randomVariation={30}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400">
            <TypewriterText text={`Error: ${error}`} typingDelay={50} />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-zinc-400">
            <TypewriterText text="No profile data available" typingDelay={50} />
          </div>
        </div>
      </div>
    );
  }

  const baseDelay = 500; // 基礎延遲時間

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <TitleBar 
        title={<TypewriterText text="關於我" delay={0} />}
        subtitle={<TypewriterText text="我是誰？我在哪？" delay={200} />}
      />

      <ProfileHeader
        avatar={profile.avatar}
        name={<TypewriterText text={profile.name} delay={300} />}
        role={<TypewriterText text={profile.role} delay={400} />}
        location={<TypewriterText text={profile.location} delay={500} />}
        connections={profile.connections}
      />

      {/* 關於我 */}
      <ProfileCard 
        icon={Signature} 
        title={<TypewriterText text="About" delay={baseDelay} />}
      >
        <p className="text-zinc-400 whitespace-pre-line">
          <TypewriterText text={profile.about} delay={baseDelay + 100} />
        </p>
      </ProfileCard>

      {/* 工作經驗 */}
      <ProfileCard 
        icon={Briefcase} 
        title={<TypewriterText text="Experience" delay={baseDelay + 200} />}
      >
        {profile.experience.map((exp: Experience, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={Briefcase}
            title={exp.title}
            subtitle={exp.company}
            period={exp.period}
            location={exp.location}
            description={exp.description}
            index={index}
            baseDelay={baseDelay + 300}
          />
        ))}
      </ProfileCard>

      {/* 教育背景 */}
      <ProfileCard 
        icon={GraduationCap} 
        title={<TypewriterText text="Education" delay={baseDelay + 400} />}
      >
        {profile.education.map((edu: Education, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={GraduationCap}
            title={edu.school}
            subtitle={`${edu.degree} · ${edu.field}`}
            period={edu.period}
            index={index}
            baseDelay={baseDelay + 500}
          />
        ))}
      </ProfileCard>

      {/* 證照與認證 */}
      <ProfileCard 
        icon={Award} 
        title={<TypewriterText text="Licenses & Certifications" delay={baseDelay + 600} />}
      >
        {profile.certifications.map((cert: Certification, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={Award}
            title={cert.name}
            subtitle={cert.issuer}
            period={`發行於 ${cert.issued}`}
            index={index}
            baseDelay={baseDelay + 700}
            extra={
              <>
                {cert.credentialId && (
                  <p className="text-sm text-zinc-500">
                    <TypewriterText 
                      text={`證書編號：${cert.credentialId}`}
                      delay={baseDelay + 800 + index * 100}
                    />
                  </p>
                )}
                {cert.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs text-neutral-700 border-neutral-700 bg-transparent"
                    onClick={() => window.open(cert.link, "_blank")}
                  >
                    <TypewriterText text="See credential" delay={baseDelay + 900 + index * 100} />
                    <ExternalLink size={12} className="ml-1" />
                  </Button>
                )}
              </>
            }
          />
        ))}
      </ProfileCard>

      {/* 志願服務 */}
      <ProfileCard 
        icon={Calendar} 
        title={<TypewriterText text="Volunteer Experience" delay={baseDelay + 1000} />}
      >
        {profile.volunteer.map((vol: Volunteer, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={Calendar}
            title={vol.role}
            subtitle={vol.organization}
            period={vol.period}
            description={vol.description}
            index={index}
            baseDelay={baseDelay + 1100}
          />
        ))}
      </ProfileCard>

      {/* 專案經驗 */}
      <ProfileCard 
        icon={Code} 
        title={<TypewriterText text="Projects" delay={baseDelay + 1200} />}
      >
        {profile.projects.map((project: Project, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={Code}
            title={project.name}
            period={project.period}
            description={project.description}
            index={index}
            baseDelay={baseDelay + 1300}
            extra={
              project.collaborators && (
                <div className="mt-2 text-zinc-500">
                  <TypewriterText 
                    text={`合作者：${project.collaborators.join(", ")}`}
                    delay={baseDelay + 1400 + index * 100}
                  />
                </div>
              )
            }
          />
        ))}
      </ProfileCard>

      {/* 成績 */}
      <ProfileCard 
        icon={LucideBookOpen} 
        title={<TypewriterText text="Test Scores" delay={baseDelay + 1500} />}
      >
        {profile.scores.map((score: Score, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={LucideBookOpen}
            title={score.test}
            subtitle={`分數：${score.score}`}
            period={score.date}
            index={index}
            baseDelay={baseDelay + 1600}
          />
        ))}
      </ProfileCard>

      {/* 語言能力 */}
      <ProfileCard 
        icon={Globe} 
        title={<TypewriterText text="Languages" delay={baseDelay + 1700} />}
      >
        {profile.languages.map((lang: Language, index: number) => (
          <TypewriterProfileItem
            key={index}
            icon={Globe}
            title={lang.name}
            subtitle={lang.level}
            period={undefined}
            location={undefined}
            description={undefined}
            extra={undefined}
            index={index}
            baseDelay={baseDelay + 1800}
          />
        ))}
      </ProfileCard>
    </div>
  );
}