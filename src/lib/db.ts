import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql' // Fixed capitalization
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  // Production: If variables exist, connect to your cloud Turso database instance
  if (tursoUrl && tursoToken) {
    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter, log: ['error', 'warn'] })
  }

  // Development Fallback: Prisma 7 natively requires an adapter inside the constructor
  // We use a local file client so your local setup keeps running automatically
  const localClient = createClient({
    url: process.env.DATABASE_URL ?? "file:./prisma/custom.db",
  })
  const localAdapter = new PrismaLibSQL(localClient)

  return new PrismaClient({
    adapter: localAdapter,
    log: process.env.NODE_ENV !== 'production' ? ['query'] : ['error', 'warn'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
