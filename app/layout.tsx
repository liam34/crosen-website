import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { Footer } from "@/components/site";
import { Header } from "@/components/site-header";
import { services } from "@/lib/content";
import "@/styles.css";

const siteUrl = "https://crosenclean.ca";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crosen Cleaning Services | Edmonton, AB",
    template: "%s | Crosen Cleaning Services Inc.",
  },
  description:
    "Crosen Cleaning Services Inc. provides commercial, industrial, and move-in/move-out cleaning in Edmonton, Alberta. Call 780-884-1244 for a quote.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Crosen Cleaning Services Inc.",
    siteName: "Crosen Cleaning Services Inc.",
    locale: "en_CA",
    url: siteUrl,
    description: "Commercial, industrial, and move-in/move-out cleaning in Edmonton, Alberta.",
  },
  twitter: { card: "summary" },
  icons: {
    icon: [{ url: "/crosen-favicon-64.png", type: "image/png", sizes: "64x64" }],
  },
};

const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "Crosen Cleaning Services Inc.",
  url: siteUrl,
  logo: `${siteUrl}/crosen-logo.webp`,
  image: `${siteUrl}/crosen-logo.webp`,
  description: "Commercial, industrial, and move-in/move-out cleaning in Edmonton, Alberta.",
  telephone: "+1-780-884-1244",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 23, 4004 97 St NW",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    postalCode: "T6E 6N1",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.text,
      },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${manrope.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
