import "./globals.css";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";

export const metadata = {
  title: "TBH",
  description: "The burger house, the best burger in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
         
        <DeviceBlock>
          <Navbar />
          {children}
        </DeviceBlock>
      </body>
    </html>
  );
}
