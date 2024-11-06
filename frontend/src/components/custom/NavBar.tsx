import { Button } from '../ui/button'
import { Settings } from 'lucide-react'

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800/50 z-50 h-16">
      {/* 使用 h-full 確保容器佔滿高度，移除 p-4 改用 px-4 */}
      <div className="h-full flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-1">
          <span 
            className="text-sm flex items-center opacity-100 vt323-regular"
            style={{
              fontFamily: "'VT323', system-ui",
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 0.3s ease"
            }}
          >
            &gt; Hello World!
          </span>
          <span className="animate-[blink_1s_ease-in-out_infinite]">▌</span>
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
      </div>
    </header>
  )
}

export default NavBar