import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";

// declare module 'next-auth' {
//     /**
//      * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         user: {
//             /** The user's role in the system. */
//             /**
//              * By default, TypeScript merges new interface properties and overwrites existing ones.
//              * In this case, the default session user properties will be overwritten,
//              * with the new ones defined above. To keep the default session user properties,
//              * you need to add them back into the newly declared interface.
//              */
//             password: string;
//         } & DefaultSession['user'];
//     }

//     interface User {
//         password: string;
//     }
// }

const prismaAdapter = PrismaAdapter(prisma);

const googleProvider = Google({
  authorization: {
      params: { hd: 'g.rit.edu' },
  },
});

const getUserFromDb = async (email: string) => {
  if (!prismaAdapter.getUserByEmail) {
    throw new Error("getUserByEmail not implemented");
  }
  const user = await prismaAdapter.getUserByEmail(email);
  return user;
}

const createUser = async (name: string, email: string) => {
  if (!prismaAdapter.createUser) {
    throw new Error("createUser not implemented");
  }
  const user = await prismaAdapter.createUser({ id: '', email, name, emailVerified: new Date() });
  return user;
};

const credentialsProvider = Credentials({
  credentials: {
    name: { label: "Name", type: "text", placeholder: "Only required if new acct" },
    email: { label: "Email", type: "email", placeholder: "Email" },
  },
  async authorize(credentials) {
    let user = null;

    const name = credentials.name as string;
    const email = credentials.email as string;

    user = await getUserFromDb(email);

    if (!user) {
      // create user
      user = await createUser(name, email);
    }

    return user;
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: prismaAdapter,
  providers: [googleProvider, credentialsProvider],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      return {
        user: {
          id: token.id as string,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        },
        expires: session.expires?.toISOString?.() ?? session.expires,
      }
    },
  },
})