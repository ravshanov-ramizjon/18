// components/castom/AdminHeader.tsx
'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";

export default function AdminHeader() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin" });
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-gray-800">My App</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Выйти
      </Button>
    </header>
  )
}
