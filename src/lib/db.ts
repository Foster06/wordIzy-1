import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  // Production: Pass the raw connection config objects to the Prisma adapter
  if (tursoUrl && tursoToken) {
    const adapter = new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoToken,
    })
    return new PrismaClient({ adapter, log: ['error', 'warn'] })
  }

  // Development Fallback: Pass the local config options objects to the Prisma adapter
  const localAdapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./prisma/custom.db",
  })

  return new PrismaClient({
    adapter: localAdapter,
    log: process.env.NODE_ENV !== 'production' ? ['query'] : ['error', 'warn'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
