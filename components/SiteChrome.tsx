import Link from "next/link";
import type { ReactNode } from "react";

/** Nav + footer for the code-driven entry routes (blog / case studies). The CMS marketing
 *  pages bring their own navbar/footer blocks; these mirror them for visual consistency. */
const NAV = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="site-nav">
        <Link className="brand" href="/">Acme</Link>
        <div className="links">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link className="bcms-button bcms-button--primary" href="/contact">Contact</Link>
        </div>
      </nav>
      {children}
      <footer className="bcms-block--footer">
        <p className="bcms-footer-copy">© Acme, Inc. Built with BetterCMS.</p>
      </footer>
    </>
  );
}
