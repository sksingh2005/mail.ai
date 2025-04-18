// app/signin/page.tsx
"use client";

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const registeredSuccess = searchParams?.get('registered') === 'true';
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      
      if (res?.error) {
        setError("Invalid username or password");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        
        {registeredSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Account created successfully! Please sign in.
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialSignIn} className="space-y-4 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>
        
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 absolute w-full"></div>
          <div className="bg-white px-4 text-sm text-gray-500 z-10 relative">OR</div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.617 0 3.088.59 4.222 1.566l2.831-2.774A9.965 9.965 0 0 0 12 1C7.037 1 2.83 4.119 1.266 8.47l3.343 2.577C5.545 7.64 8.55 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.5c0-.815-.073-1.6-.21-2.354H12v4.448h6.473c-.28 1.512-1.134 2.795-2.416 3.657l3.306 2.557c1.927-1.773 3.037-4.392 3.037-8.308z"
              />
              <path
                fill="#34A853"
                d="M5.276 14.975l-3.343 2.577C3.465 21.126 7.266 24 12 24c3.293 0 6.045-1.082 8.057-2.932l-3.306-2.557c-.914.614-2.087.977-3.751.977-2.868 0-5.302-1.933-6.169-4.53z"
              />
              <path
                fill="#FBBC05"
                d="M1.266 8.47C.466 9.84 0 11.36 0 13s.466 3.16 1.266 4.53l3.343-2.577c-.17-.51-.263-1.057-.263-1.624s.093-1.114.263-1.624L1.266 8.47z"
              />
            </svg>
            Sign in with Google
          </button>
          
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            Sign in with GitHub
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}