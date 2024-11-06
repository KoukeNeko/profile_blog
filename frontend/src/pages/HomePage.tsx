import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useState, useEffect } from "react";

function Homepage() {
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  // 新增用於打字效果的 state
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = `Hello, this is ${
    import.meta.env.VITE_APP_NAME || "doeshing"
  }!`;

  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 50; // The delay between each character
    const randomVariation = 30; // The random variation in typing delay

    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;

        // add a random delay to simulate human typing
        const randomDelay = typingDelay + Math.random() * randomVariation;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start the typing animation
    setTimeout(typeNextChar, 400); // 400ms delay before starting the typing animation

    return () => {
      setIsTypingComplete(false);
    };
  }, [fullText]);

  return (
   <>
      <h1 className="text-4xl font-bold text-zinc-300 mb-8 relative">
        <span
          className={`transition-opacity duration-200 ${
            isTypingComplete ? "opacity-100" : "opacity-80"
          }`}
        >
          {displayText}
        </span>
        {!isTypingComplete && (
          <span className="inline-block ml-1">
          <span
            className="text-zinc-300 animate-pulse block"
            style={{
              fontSize: '0.8em',
              lineHeight: 1,
              verticalAlign: 'middle',
              marginTop: '-2px'
            }}
          >
            &#11044;
          </span>
        </span>
        )}
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
    </>
  );
}

export default Homepage;
