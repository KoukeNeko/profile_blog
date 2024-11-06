import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import ToTopButton from "@/components/custom/ToTopButton";
import Homepage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import BlogPage from "@/pages/BlogPage";
import AboutPage from "@/pages/AboutPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-400">
        <NavBar />
        
        <div className="flex-grow flex flex-col pt-16">
          <main className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToTopButton />
      </div>
    </Router>
  );
}

export default App;