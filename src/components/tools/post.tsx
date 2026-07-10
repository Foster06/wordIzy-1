// 1. Add this import at the very top of your file:
import { db as prisma } from "@/lib/db"; 

// 2. Your existing function will now work perfectly:
async function getFeed() {
  const activePosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return activePosts;
}