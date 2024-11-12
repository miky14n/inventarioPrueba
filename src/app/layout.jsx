import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import NavbarSidebar from "@/components/NavbarSidebar/NavbarSidebar";
import { SettingsProvider } from "./context/SettingsContext";
import Customizer from "@/components/Customizer";
import ConfigureAmplifyClientSide from "@/amplify-cognito-config";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Nux Inventory",
  description: "Web page for Nuxway inventory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-500">
        <Providers>
          <SettingsProvider>
            <NavbarSidebar />
            <Customizer />
            <div className="min-h-screen ">
              <ConfigureAmplifyClientSide />
              {children}
            </div>
          </SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}
