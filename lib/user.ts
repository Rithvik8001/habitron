import { prisma } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function getOrCreateUser(userId: string) {
  // First try to get the existing user
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  // If user doesn't exist, get their email from Clerk
  const clerkUser = await currentUser();
  if (!clerkUser?.emailAddresses?.[0]?.emailAddress) {
    throw new Error("User email not found");
  }

  // Create the user with their email
  const user = await prisma.user.create({
    data: {
      id: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });

  return user;
}
