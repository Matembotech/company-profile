import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Reshaped } from "reshaped";
import { AuthProvider } from "./context/AuthContext";

const monaSans = localFont({
  src: [
    {
      path: "../fonts/MonaSans-Regular.woff2",
      weight: "400",
    },
    {
      path: "../fonts/MonaSans-Medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/MonaSans-Bold.woff2",
      weight: "700",
    },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matembo Tech Company",
  description: "We Build Smart, Scalable, and Intelligent Digital Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        ${monaSans.className}`}
      >
        <div className="bg-[#242424] min-h-screen">
          <Reshaped>
            <AuthProvider>{children}</AuthProvider>
          </Reshaped>
        </div>
      </body>
    </html>
  );
}
