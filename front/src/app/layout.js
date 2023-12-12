"use client";

import { Inter, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "@/context/SessionContextProvider";

import Footer from "@/components/Footer";
import NavLogged from "@/components/NavLogged";
import NotLoggedNav from "@/components/NotLoggedNav";

import { getStorageData } from "@/controllers/localStorageController";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const user = getStorageData();
  return (
    <html lang="en">
      <SessionContextProvider>
        <body
          className={`${inter.className} flex flex-col justify-between relative w-full h-screen`}
        >
          {user ? <NavLogged /> : <NotLoggedNav />}

          {children}

          <Footer />
        </body>
      </SessionContextProvider>
    </html>
  );
}
