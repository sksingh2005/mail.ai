import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import NextAuth from "next-auth";
export const dynamic = "force-dynamic"; // Ensure no prerendering

const handler=NextAuth(NEXT_AUTH_CONFIG);

export {handler as GET, handler as POST};