import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";

export const metadata: Metadata = {
  title: "Carsties",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Navbar />
        <main className="container mx-auto px-5 py-10">{children}</main>
      </body>
    </html>
  );
}