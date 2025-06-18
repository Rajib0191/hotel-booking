import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { SearchFormProvider } from "@/context/SearchFormContext";

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Book your suitable room.",
  openGraph: {
    title: "Hotel Booking",
    description: "Book your suitable room.",
    url: "https://25c7-43-243-205-130.ngrok-free.app", // Will need to change for production
    siteName: "Hotel Booking",
    images: [
      {
        url: "https://25c7-43-243-205-130.ngrok-free.app/logo.png", // Direct path from public folder
        width: 1200,
        height: 630,
        alt: "Hotel Booking Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking",
    description: "Book your suitable room.",
    images: "https://25c7-43-243-205-130.ngrok-free.app/logo.png", // Single string (not array) for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        suppressHydrationWarning
        className={`${dosis.variable} antialiased`}
      >
        <SearchFormProvider>
          <Providers>{children}</Providers>
        </SearchFormProvider>
      </body>
    </html>
  );
}
