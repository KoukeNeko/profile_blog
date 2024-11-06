// src/components/ToTopButton.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <Button variant="outline" onClick={scrollToTop} className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800/50">
          <ChevronUp />
        </Button>
      )}
    </div>
  );
};

export default ToTopButton;