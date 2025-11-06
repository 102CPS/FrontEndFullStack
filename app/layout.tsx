import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "FootTrack",
  description: "A football team and match overview app.",
  icons: {
    icon: "/logo.png", // 👈 path to your custom logo
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
