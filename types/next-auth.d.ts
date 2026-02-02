import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "author" | "editor" | "admin";
      authorNumber: string | null;
      editorNumber: string | null;
      editorStatus: string | null;
      editorTier: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "author" | "editor" | "admin";
    authorNumber: string | null;
    editorNumber: string | null;
    editorStatus: string | null;
    editorTier: string | null;
  }
}
