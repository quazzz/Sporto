import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import {prisma} from "@/lib/prisma";

export const authOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        
        if (!existingUser) {
          
          const random = Math.random().toString(36).slice(-8)
          const hashed = await bcrypt.hash(random,10)
          const newUser = await prisma.user.create({
            data: { 
              email: profile.email,
              name: profile.name,
              password: hashed
            },
          });
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          };
        }

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          name: existingUser.name,
          image: existingUser.image,
        };
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please fill out all fields");
        }
        const { email, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("User does not exist");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Password does not match");
          }

          return { id: user.id.toString(), email: user.email, name: user.name };
        } catch (error) {
          console.log("Error in authorization:", error);
          throw new Error("User doesn't exist or password mismatch");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
