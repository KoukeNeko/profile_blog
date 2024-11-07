import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  /**
   * 打字速度 (毫秒)
   * @default 5
   */
  typingDelay?: number;
  /**
   * 打字速度的隨機變化範圍 (毫秒)
   * @default 15
   */
  randomVariation?: number;
  /**
   * 是否顯示游標
   * @default true
   */
  showCursor?: boolean;
  /**
   * 游標樣式
   * @default "⬤"
   */
  cursor?: string;
  /**
   * 自定義游標顏色
   * @default "text-zinc-300"
   */
  cursorColor?: string;
}

const TypewriterText = ({
  text,
  delay = 0,
  className = "",
  typingDelay = 5,
  randomVariation = 15,
  showCursor = true,
  cursor = "⬤",
  cursorColor = "text-zinc-300"
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        const randomDelay = typingDelay + Math.random() * randomVariation;
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTypingComplete(true);
      }
    };

    const timer = setTimeout(() => typeNextChar(), delay);
    return () => clearTimeout(timer);
  }, [text, delay, typingDelay, randomVariation]);

  return (
    <span className={className}>
      <span className={`transition-opacity duration-200 ${
        isTypingComplete ? "opacity-100" : "opacity-80"
      }`}>
        {displayText}
      </span>
      {!isTypingComplete && showCursor && (
        <span className="inline-block ml-1">
          <span 
            className={`${cursorColor} animate-pulse block`} 
            style={{
              fontSize: '0.8em',
              lineHeight: 1,
              verticalAlign: 'middle',
              marginTop: '-2px'
            }}
          >
            {cursor}
          </span>
        </span>
      )}
    </span>
  );
};

export default TypewriterText;