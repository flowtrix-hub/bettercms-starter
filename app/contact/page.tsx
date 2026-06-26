import type { Metadata } from "next";
import { CmsPage, pageMetadata } from "../../lib/page";

export const generateMetadata = (): Metadata => pageMetadata("contact");

export default function ContactPage() {
  return <CmsPage slug="contact" />;
}
