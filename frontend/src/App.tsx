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
import LineCallbackPage from "@/pages/LineCallbackPage";
import BlogPage from "@/pages/BlogPage";
import ProjectPage from "@/pages/ProjectPage";
import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const centeredPages = ["/", "/login", "/login/line/callback"];
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
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error('Google Client ID is not set in environment variables');
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-400">
          <NavBar />
          <div className="flex-grow flex flex-col pt-16">
            <MainContent>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/line/callback" element={<LineCallbackPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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