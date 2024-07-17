import { Inter } from "next/font/google";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wavehack Grant Tracker",
  description: "Wavehack Grant Tracker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
