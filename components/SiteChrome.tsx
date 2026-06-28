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
        <Link className="brand" href="/">Acme<span className="dot">.</span></Link>
        <div className="links">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link className="bcms-button bcms-button--primary" href="/contact">Contact</Link>
        </div>
      </nav>
      {children}
      <footer className="site-footer">
        <div className="site-footer-cols">
          <div className="site-footer-brand">
            <Link className="brand" href="/">Acme<span className="dot">.</span></Link>
            <p>Ship structured content faster. A marketing starter powered by BetterCMS.</p>
          </div>
          <div className="site-footer-col">
            <h4>Explore</h4>
            <ul>
              {NAV.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="site-footer-col">
            <h4>Get started</h4>
            <ul>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="https://bettercms.ai" target="_blank" rel="noreferrer">BetterCMS</a></li>
            </ul>
          </div>
        </div>
        <p className="site-footer-copy">© {new Date().getFullYear()} Acme, Inc. Built with BetterCMS.</p>
      </footer>
    </>
  );
}
