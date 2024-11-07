import React from 'react';
import TypewriterText from "@/components/custom/ui/typewriter_gpt_style";

interface TitleBarProps {
  title: string;
  subtitle: string;
  titleDelay?: number;
  subtitleDelay?: number;
}

const TitleBar: React.FC<TitleBarProps> = ({ 
  title, 
  subtitle, 
  titleDelay = 0, 
  subtitleDelay = 100 
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-200 mb-2">
        <TypewriterText text={title} delay={titleDelay} />
      </h1>
      <p className="text-zinc-400">
        <TypewriterText text={subtitle} delay={subtitleDelay} />
      </p>
    </div>
  );
};

export default TitleBar;