import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

import Homepage from "@/pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-400 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <Homepage />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
