import { db } from '@/db/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';

export const NEXT_AUTH_CONFIG = {
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
      }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        if (!credentials.username || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        
        const user = await db.user.findFirst({
          where: {
            username: credentials.username,
          },
        });
        
        if (!user) {
          throw new Error("Invalid credentials");
        }
        
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
        
        return {
          id: user.id,
          email: user.username
        };
      },
    }),
  ],
  // Rest of the config remains the same
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
  }
}