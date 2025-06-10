import localFont from "next/font/local"; 

export const bricolageGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bricolage", 
});