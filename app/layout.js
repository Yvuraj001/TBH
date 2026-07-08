import "./globals.css";
import { QuantityProvider } from "./Context/context";

export const metadata = {
  title: "TBH",
  description: "The burger house, the best burger in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
       
        <QuantityProvider>{children}</QuantityProvider>
      </body>
    </html>
  );
}
