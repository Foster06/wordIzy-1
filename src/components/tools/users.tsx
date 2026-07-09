import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNewUserWithPost() {
  const newUser = await prisma.user.create({
    data: {
      email: 'developer@example.com',
      name: 'Alex Dev',
      // do not set posts here; link posts via authorId on post creation
    },
  });

  const newPost = await prisma.post.create({
    data: {
      title: 'Getting Started with Prisma 7',
      content: 'This is my very first database post record.',
      authorId: newUser.id,
      published: true,
    },
  });

  return { newUser, newPost };
}
