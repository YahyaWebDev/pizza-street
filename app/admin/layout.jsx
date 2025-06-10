"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function AdminLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Check both publicMetadata.isAdmin and the specific email
      const isAdmin = user?.publicMetadata?.isAdmin;
      const isAuthorizedEmail = user?.emailAddresses?.some(
        email => email.emailAddress === "lakhouilyahya@gmail.com"
      );

      if (!isAdmin || !isAuthorizedEmail) {
        router.push("/");
      } else {
        setAccessGranted(true);
      }
      setLoading(false);
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Verifying permissions...</div>
      </div>
    );
  }

  if (!accessGranted) {
    return null; 
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">
            Connected as: {user.primaryEmailAddress?.emailAddress}
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}