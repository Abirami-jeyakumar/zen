"use client";
import { signOut } from "next-auth/react";
export function AdminSignout() {
  return <button className="admin-signout" onClick={() => signOut({ callbackUrl: "/admin/login" })}>Sign out ↗</button>;
}
