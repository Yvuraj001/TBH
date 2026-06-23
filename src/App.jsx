import Hero from "./conponents/Hero";
import Navbar from "./conponents/Navbar";

const App = () => {
  return (
    <main className="w-screen  bg-[#ffe6cd] overflow-x-hidden">
      <Navbar />
      <Hero />
    </main>
  );
};

export default App;
