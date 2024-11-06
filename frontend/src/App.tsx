// App.tsx
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import Homepage from "@/pages/HomePage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-400">
      {/* Fixed Header */}
      <NavBar />

      {/* Main Content Area that takes up remaining space */}
      <div className="flex-grow flex flex-col pt-16">
        <main className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
          <Homepage />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
