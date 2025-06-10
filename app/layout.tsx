import type { Metadata } from "next";
import "./globals.css";
import { bricolageGrotesque } from "../lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./footer"
import NavBar from "./navbar";

export const metadata: Metadata = {
  title: "Pizza Street Safi – Pizzas au Feu de Bois, Sandwiches & Jus Frais",
  description: "Commandez les meilleures pizzas cuites au feu de bois, sandwiches gourmets et jus naturels à Safi. Livraison rapide uniquement à Safi. Pâte fraîche, ingrédients premium !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body
        className={`${bricolageGrotesque.className} antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
      </ClerkProvider>
    </html>
  );
}
