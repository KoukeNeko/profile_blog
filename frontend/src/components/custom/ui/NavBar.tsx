import { Button } from "../../ui/button";
import { Settings, Menu, Signature, ReceiptText, Code } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800/50 z-50 h-16">
      <div className="h-full flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link to="/" className="flex items-center space-x-1">
          <span
            className="text-sm flex items-center opacity-100 vt323-regular"
            style={{
              fontFamily: "'VT323', system-ui",
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 0.3s ease",
            }}
          >
            &gt; Hello World!
          </span>
          <span className="animate-[blink_1s_ease-in-out_infinite]">▌</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-zinc-400"
            onClick={() => navigate("/blog")}
          >
            <ReceiptText className="mr-2" size={16} />
            Blog
          </Button>
          <Button
            variant="ghost"
            className="text-zinc-400"
            onClick={() => navigate("/project")}
          >
            <Code className="mr-2" size={16} />
            Project
          </Button>
          <Button
            variant="ghost"
            className="text-zinc-400"
            onClick={() => navigate("/about")}
          >
            <Signature className="mr-2" size={16} />
            About
          </Button>
          <Button
            variant="ghost"
            className="text-zinc-400 p-2"
            onClick={() => navigate("/login")}
          >
            <Settings size={16} />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-zinc-400 p-2">
                <Menu size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800/50 text-zinc-400"
            >
              <DropdownMenuItem onClick={() => navigate("/blog")}>
                <ReceiptText className="mr-2" size={16} />
                Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/about")}>
                <Signature className="mr-2" size={16} />
                About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/login")}>
                <Settings className="mr-2" size={16} />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
