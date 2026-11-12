import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Steps � Come back to your feet",
  description: "Thoughtful stone-path sessions and grounding rituals, with Zen Steps centres across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}

