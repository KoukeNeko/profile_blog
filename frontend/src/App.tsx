import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "@/components/custom/ui/NavBar";
import Footer from "@/components/custom/ui/Footer";
import ToTopButton from "@/components/custom/ui/ToTopButton";
import Homepage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import BlogPage from "@/pages/BlogPage";
import ProjectPage from "@/pages/ProjectPage";
import AboutPage from "@/pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const centeredPages = ["/", "/login"];
  const shouldCenter = centeredPages.includes(location.pathname);

  return (
    <main
      className={`flex-grow flex flex-col ${
        shouldCenter ? "justify-center items-center" : ""
      }`}
    >
      {children}
    </main>
  );
};

function App() {
  // 確保 VITE_GOOGLE_CLIENT_ID 存在
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not set in environment variables');
    return null;
  }

  return (
    <GoogleOAuthProvider 
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
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
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </MainContent>
            <Footer />
          </div>
          <ToTopButton />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;