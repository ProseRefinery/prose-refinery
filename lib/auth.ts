import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from "./db/mongodb";
import User from "./db/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          return null;
        }

        // User signed up with Google only
        if (!user.password) {
          throw new Error("GoogleAccountOnly");
        }

        const isValid = await user.comparePassword(
          credentials.password as string
        );

        if (!isValid) {
          return null;
        }

        if (user.isActive === false) {
          throw new Error("AccountDisabled");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new author account for Google sign-ups
          await User.create({
            email: user.email,
            name: user.name || "Author",
            image: user.image || undefined,
            emailVerified: new Date(),
            role: "author",
          });
        } else if (existingUser.isActive === false) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user?.email || trigger === "update") {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email || user?.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role || "author";
          token.authorNumber = dbUser.authorNumber || null;
          token.editorNumber = dbUser.editorNumber || null;
          token.editorStatus = dbUser.editorStatus || null;
          token.editorTier = dbUser.editorTier || null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "author" | "editor" | "admin") || "author";
        session.user.authorNumber = (token.authorNumber as string) || null;
        session.user.editorNumber = (token.editorNumber as string) || null;
        session.user.editorStatus = (token.editorStatus as string) || null;
        session.user.editorTier = (token.editorTier as string) || null;
      }
      return session;
    },
  },
});
