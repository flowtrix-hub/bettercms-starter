import type { Metadata } from "next";
import { CmsPage, pageMetadata } from "../lib/page";

export const generateMetadata = (): Metadata => pageMetadata("home");

export default function HomePage() {
  return <CmsPage slug="home" />;
}
