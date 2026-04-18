import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nordic Co-Work Manager | Premium Workspace Management",
  description: "Sistema de gestión para espacios de co-work con estética minimalista nórdica. Control de oficinas, alquileres y clientes.",
  keywords: ["coworking", "management", "nordic design", "workspace", "admin dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body 
        className={`${inter.variable} font-sans bg-nordic-bg text-nordic-on-bg min-h-screen`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
