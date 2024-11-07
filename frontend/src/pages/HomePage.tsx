import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  LinkedinIcon,
  Mail,
  ShieldCheck,
  MapPin,
  FileUser,
  Github,
} from "lucide-react";
import { useState, useEffect} from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/sonner"

function Homepage() {

  const { toast } = useToast();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 確保組件完全掛載
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const checkLoginStatus = async () => {
      const justLoggedIn = sessionStorage.getItem('justLoggedIn');
      if (justLoggedIn) {
        try {
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
          
          // 確保有足夠的延遲
          await new Promise(resolve => setTimeout(resolve, 500));
          
          console.log('Showing toast for:', userInfo.name); // 調試日誌
          
          toast({
            title: "登入成功",
            description: `歡迎回來，${userInfo.name}！`,
            duration: 3000,
            className: "bg-zinc-950 border-zinc-800 text-zinc-300"
          });
          
          sessionStorage.removeItem('justLoggedIn');
        } catch (error) {
          console.error('Error showing welcome toast:', error);
        }
      }
    };

    checkLoginStatus();
  }, [isReady, toast]);

  // 用於調試
  useEffect(() => {
    console.log('HomePage mounted');
    console.log('JustLoggedIn status:', sessionStorage.getItem('justLoggedIn'));
    console.log('UserInfo:', localStorage.getItem('userInfo'));
  }, []);

  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  // 新增用於打字效果的 state
  const fullText = `Hello, this is ${
    import.meta.env.VITE_APP_NAME || "doeshing"
  }!`;

  return (
   <>
      <h1 className="text-4xl font-bold text-zinc-300 mb-8 relative">
        <TypewriterText 
          text={fullText}
          typingDelay={50}
          randomVariation={30}
          delay={400}
        />
      </h1>
      <div className="flex space-x-6">
        <a
          href="https://github.com/KoukeNeko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
          >
            <Github
              size={20}
              fill={isGithubHovered ? "currentColor" : "none"}
            />
          </Button>
        </a>

        <a
          href="mailto:contact@doeshing.ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Mail size={20} />
          </Button>
        </a>

        <a
          href="https://www.cake.me/me/doeshing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:bg-green-600"
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
          >
            <FileUser
              size={20}
              fill={isResumeHovered ? "currentColor" : "none"}
            />
          </Button>
        </a>

        <HoverCard>
          <HoverCardTrigger>
            <a
              href="https://www.linkedin.com/in/doeshing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-yellow-500"
                onMouseEnter={() => setIsLinkedinHovered(true)}
                onMouseLeave={() => setIsLinkedinHovered(false)}
              >
                <LinkedinIcon
                  size={20}
                  fill={isLinkedinHovered ? "currentColor" : "none"}
                />
              </Button>
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-zinc-950 border-zinc-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border border-zinc-800">
                  <AvatarImage src={import.meta.env.VITE_PROFILE_IMAGE_URL} />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-zinc-200">
                      in/doeshing
                    </p>
                    <ShieldCheck
                      className="w-4 h-4 text-gray-500"
                      strokeWidth={2.5}
                      fill="none"
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm text-zinc-300">
                A student studying CSIE at NTOU | Full-Stack Developer |
                Learning Cloud Development
              </div>
              <div className="flex items-center text-xs text-zinc-500">
                <span>國立台灣海洋大學</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <MapPin className="w-4 h-4" />
                <span>Taipei–Keelung Metropolitan area</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Toaster/>
    </>
  );
}

export default Homepage;
