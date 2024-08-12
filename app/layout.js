import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SessionWrapper from "../components/sessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "My Blog App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="absolute top-0 z-[-2] h-max min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <Navbar />
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
