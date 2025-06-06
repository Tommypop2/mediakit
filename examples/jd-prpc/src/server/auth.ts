import { type SolidAuthConfig } from '@solid-mediakit/auth'
import Discord from '@auth/core/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

declare module '@auth/core/types' {
  export interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  debug: false,
  basePath: import.meta.env.VITE_AUTH_PATH,
}
