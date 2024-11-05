import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";

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
//         } & DefaultSession['user'];
//     }

//     interface User {
//     }
// }

const googleProvider = Google({
  authorization: {
      params: { hd: 'g.rit.edu' },
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [googleProvider],
})