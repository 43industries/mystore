import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyStoreke",
  description:
    "Find your perfect stay — discover unique places to stay in the countryside.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

