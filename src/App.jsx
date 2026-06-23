import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="w-screen h-screen bg-[#ffe6cd] overflow-x-hidden">
      <Navbar />
      <Hero />
    
    </main>
  );
};

export default App;
