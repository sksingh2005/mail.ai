"use server"

import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./auth";

export const getAurinkoAuthURL = async (serviceType: 'Google' | 'Office365') => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) throw new Error('User not authenticated');
  console.log("Client ID:", process.env.AURINKO_CLIENT_ID);
  const params = new URLSearchParams({
    clientId: process.env.AURINKO_CLIENT_ID as string,
    serviceType,
    scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
    response_type: 'code',
    returnUrl: `${process.env.NEXTAUTH_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};
