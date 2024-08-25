import type { Metadata } from "next";
import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "./context/AuthContext";
import Logout from "./components/Logout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Moodmap",
  description: "Track your daily mood everyday of the year",
  openGraph: {
    type: "website",
    url: "https://mymoodmap.vercel.app",
    siteName: "Moodmap",
    images: [
      {
        url: "og.png",
        alt: "Moodmap",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentYear = new Date().getFullYear();

  const header = (
    <header className={`p-4 sm:p-8 flex items-center justify-between gap-4`}>
      <Link href="/" className={`${fugaz.className} hover:cursor-pointer textGradient font-bold text-2xl`}>Moodmap</Link>
      <Logout />
    </header>
  );

  const footer = (
    <footer className={`${fugaz.className} p-4 sm:p-8 grid place-items-center`}>
      <p className={`text-pink-500`}>Created with 🩷</p>
      &copy; {currentYear} Moodmap
    </footer>
  );

  return (
    <html lang="en" data-theme="light">
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </header>
      <body className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${inter.className}`}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <AuthProvider>
          {header}
          {children}
          {footer}
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );

}
