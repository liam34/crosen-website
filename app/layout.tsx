import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { Footer } from "@/components/site";
import { Header } from "@/components/site-header";
import "@/styles.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Crosen Cleaning Services Inc.",
    template: "%s | Crosen Cleaning Services Inc.",
  },
  description:
    "Commercial, industrial, and move-in/move-out cleaning. A cleaner space. A brighter day.",
  openGraph: {
    type: "website",
    title: "Crosen Cleaning Services Inc.",
    description:
      "Commercial, industrial, and move-in/move-out cleaning. A cleaner space. A brighter day.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/crosen-favicon.png", type: "image/png", sizes: "64x64" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${manrope.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
