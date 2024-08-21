import type { Metadata } from "next";
import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Moodmap",
  description: "Track your daily mood everyday of the year",
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
      <Link href={"/dashboard"}>
        <div className={`${fugaz.className} flex items-center justify-between`}>Dashboard</div>
      </Link>
    </header>
  );

  const footer = (
    <footer className={`${fugaz.className} p-4 sm:p-8 grid place-items-center`}>
      <p className={`text-pink-500`}>Created with 🩷</p>
      &copy; {currentYear} Moodmap
    </footer>
  );

  return (
    <html lang="en">
      <body className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${inter.className}`}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );

}
