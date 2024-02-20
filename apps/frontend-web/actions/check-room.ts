"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export const checkRoom = async ({ roomId }: { roomId: string }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "You are unauthorised" };
    }

    const room = await db.roomIds.findFirst({
      where: {
        roomId: roomId,
      },
    });

    if (!room) {
      return { error: "No such room exist" };
    }

    return { roomId: room.roomId };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
