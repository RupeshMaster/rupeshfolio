import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rupesh Rajesh Singh — Full-Stack Developer",
  description:
    "Portfolio of Rupesh Rajesh Singh, a Full-Stack Developer focused on UI/UX, DevOps, app development, and n8n automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
