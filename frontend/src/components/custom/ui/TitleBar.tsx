import React from 'react';
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style";
import type {TitleBarProps} from "@/types/ui";

const TitleBar: React.FC<TitleBarProps> = ({ 
  title, 
  subtitle,
  enableTypewriter = false,
  titleDelay = 0, 
  subtitleDelay = 100,
  titleClassName = "text-3xl font-bold text-zinc-200 mb-2",
  subtitleClassName = "text-zinc-400"
}) => {
  if (enableTypewriter) {
    return (
      <div>
        <h1 className={titleClassName}>
          {typeof title === 'string' ? (
            <TypewriterText text={title} delay={titleDelay} />
          ) : (
            title
          )}
        </h1>
        <p className={subtitleClassName}>
          {typeof subtitle === 'string' ? (
            <TypewriterText text={subtitle} delay={subtitleDelay} />
          ) : (
            subtitle
          )}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className={titleClassName}>{title}</h1>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
  );
};

export default TitleBar;