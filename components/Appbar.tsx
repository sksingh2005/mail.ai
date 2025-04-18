"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export const Appbar = () => {
  // Use the useSession hook for client components
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <p>Welcome {session.user?.name || session.user?.email}</p>
        <button 
          onClick={() => signOut()} 
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <p>Welcome Guest</p>
        <button 
          onClick={() => signIn()} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign in
        </button>
      </div>
    );
  }
};