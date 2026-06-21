import type { ReactNode } from "react";

export const metadata = { title: "BetterCMS Starter", description: "Headless chain reference app" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "3rem auto", padding: "0 1rem" }}>
        {children}
      </body>
    </html>
  );
}
