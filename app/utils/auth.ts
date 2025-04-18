// app/utils/auth.ts
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Change to /navigation for App Router
import { useEffect } from 'react';

export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Put router usage inside useEffect to ensure it's mounted
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/api/auth/signin'); // Redirect to login if not authenticated
  }, [session, status, router]);
  
  return { session, status };
}