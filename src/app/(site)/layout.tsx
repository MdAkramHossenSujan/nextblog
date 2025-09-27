import Navbar from "@/components/shared/Navbar";
import React from "react";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen">{children}</div>
  
    </main>
  );
}

