import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import Info from "./components/Info";

const App = () => {
  return (
    <DeviceBlock>
      <main className="w-screen h-screen bg-[#ffbb7887] overflow-x-hidden">
        <Navbar />
        <Hero />
        <Info/>
      </main>
    </DeviceBlock>
  );
};

export default App;
