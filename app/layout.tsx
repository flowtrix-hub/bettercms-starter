import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Acme — Marketing Starter",
  description: "A polished marketing site powered by BetterCMS.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
