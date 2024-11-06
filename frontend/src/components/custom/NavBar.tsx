import { Button } from '../ui/button'
import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

function NavBar() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if the font is loaded
    document.fonts.ready.then(() => {
      // Additional check specifically for our font
      document.fonts.load('12px ElfFont').then(() => {
        setFontLoaded(true);
      });
    });
  }, []);

  return (
    <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span 
            className={`text-sm flex items-center ${fontLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              fontFamily: "'ElfFont', system-ui",
              marginTop: "4px",
              lineHeight: "0.9",
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 0.3s ease"
            }}
          >
            &gt; ㄋ ㄧ ˇ ㄏ ㄠ ˇ  ㄕ ˋ ㄐ ㄧ ㄝ ˋ !
          </span>
          <span className="animate-[blink_1s_ease-in-out_infinite]">■</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" className="text-zinc-400">
            Blog
          </Button>
          <Button variant="ghost" className="text-zinc-400">
            About
          </Button>
          <Button variant="ghost" className="text-zinc-400 p-2">
            <Settings size={16} />
          </Button>
        </nav>
    </header>
  )
}

export default NavBar