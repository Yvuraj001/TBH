import "./globals.css";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getKitchenStatus } from "@/lib/Getkitchenstatus";
import KitchenBanner from "./components/isOpenBanner";
export const metadata = {
  title: "TBH",
  description: "The burger house, the best burger in town",
};

export default async function RootLayout({ children }) {
  let user = await getCurrentUser()

  const kitchenIsOpen = await getKitchenStatus();
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DeviceBlock>
          <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Slide}
          />
          <Navbar userId={user} />
          <KitchenBanner isOpen={kitchenIsOpen} />
          {children}
        </DeviceBlock>
      </body>
    </html>
  );
}
