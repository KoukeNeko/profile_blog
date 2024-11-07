import React from 'react';
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style";

interface TitleBarProps {
  title: string;
  subtitle: string;
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
          <TypewriterText text={title} delay={titleDelay} />
        </h1>
        <p className={subtitleClassName}>
          <TypewriterText text={subtitle} delay={subtitleDelay} />
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