"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNavbar";

export default function NavbarSwitch() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {isDashboard ? <DashboardNavbar /> : <Navbar />}
    </>
  );
}

