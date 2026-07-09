import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  // Use global standard lookups compatible across Bun and Vercel environments
  const tursoUrl = typeof process !== 'undefined' ? process.env.TURSO_DATABASE_URL : undefined
  const tursoToken = typeof process !== 'undefined' ? process.env.TURSO_AUTH_TOKEN : undefined

  if (tursoUrl && tursoToken) {
    const adapter = new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoToken,
    })
    return new PrismaClient({ adapter, log: ['error', 'warn'] })
  }

  // Local development fallback
  const localUrl = typeof process !== 'undefined' ? process.env.DATABASE_URL : undefined
  const adapter = new PrismaLibSql({
    url: localUrl ?? "file:./prisma/custom.db",
  })
  return new PrismaClient({ adapter, log: ['query', 'error', 'warn'] })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

// Prevent hot-reloading duplicate connections in development
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
