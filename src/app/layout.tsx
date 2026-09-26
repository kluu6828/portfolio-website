import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelvin Lau (Luu)",
  description:
    "Systems & Revenue. Waterloo CS. Bridging software architecture and enterprise revenue.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
