import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
console.log(user);
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 text-3xl font-bold">
        <h1>
          Blog<span className="text-blue-500">Bites</span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/blogs" className="hover:text-blue-500 transition">
          Blogs
        </Link>
        <Link href="/add-blog" className="hover:text-blue-500 transition">
          Add Blog
        </Link>
        <Link href="/dashboard" className="hover:text-blue-500 transition">
          Dashboard
        </Link>
      </div>

      {/* Auth Buttons */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-medium">
            Welcome, {user.given_name ?? user.email}
          </span>
          <LogoutLink className={buttonVariants()} >
            Log Out
          </LogoutLink>
        </div>
      ) : (
        <div className="flex gap-3">
          <RegisterLink className={buttonVariants()} >
            Sign Up
          </RegisterLink>
          <LoginLink className={buttonVariants({variant:'secondary'})} >
         Log In
          </LoginLink>
        </div>
      )}
    </nav>
  );
}


