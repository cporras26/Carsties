import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import SignalRProvider from "@/app/providers/SignalRProvider";
import React from "react";
import { getCurrentUser } from "@/app/actions/AuthActions";

export const metadata: Metadata = {
  title: "Carsties",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aleo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-100">
        <ToasterProvider />
        <Navbar />
        <main className="px-2 py-4 xl:container md:px-5 md:py-10 xl:mx-auto">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
