// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { AuthService } from '@/services/auth.service';
// import { prisma } from '@/lib/prisma';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email }
//         });

//         if (user && await AuthService.verifyPassword(credentials?.password, user.password)) {
//           return { id: user.id, name: user.name, email: user.email, role: user.role };
//         }
//         throw new Error('Invalid credentials');
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     }
//   },
//   session: {
//     strategy: 'jwt',
//   },
// });

// export { handler as GET, handler as POST };
