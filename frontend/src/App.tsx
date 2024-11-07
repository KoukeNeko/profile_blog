import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "@/components/custom/ui/NavBar";
import Footer from "@/components/custom/ui/Footer";
import ToTopButton from "@/components/custom/ui/ToTopButton";
import Homepage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import BlogPage from "@/pages/BlogPage";
import ProjectPage from "@/pages/ProjectPage";
import AboutPage from "@/pages/AboutPage";

// Wrapper component to handle layout logic
const MainContent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Pages that should be centered
  const centeredPages = ['/', '/login'];
  const shouldCenter = centeredPages.includes(location.pathname);

  return (
    <main className={`flex-grow flex flex-col ${
      shouldCenter ? 'justify-center items-center' : ''
    }`}>
      {children}
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-400">
        <NavBar />
        
        <div className="flex-grow flex flex-col pt-16">
          <MainContent>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </div>
        <ToTopButton />
      </div>
    </Router>
  );
}

export default App;