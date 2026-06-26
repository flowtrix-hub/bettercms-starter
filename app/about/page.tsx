import type { Metadata } from "next";
import { CmsPage, pageMetadata } from "../../lib/page";

export const generateMetadata = (): Metadata => pageMetadata("about");

export default function AboutPage() {
  return <CmsPage slug="about" />;
}
