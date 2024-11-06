import '@/assets/font/elffont-rock.otf'
import { Button } from '../ui/button'
import { Settings } from 'lucide-react'

function NavBar() {
  return (
    <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span 
            className="text-sm flex items-center" 
            style={{
              fontFamily: "ElfFont",
              transform: "translateY(4px)",  // 微調往下的位置
              lineHeight: "0.9",               // 減少行高
              display: "inline-flex",        // 確保更好的對齊控制
              alignItems: "center"           // 垂直居中
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