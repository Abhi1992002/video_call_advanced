"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
export const createRoomId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "You are unauthorised" };
    }

    const roomId = uuidv4();

    const room = await db.roomIds.create({
      data: {
        roomId: roomId,
        hostId: userId,
      },
    });

    return { roomId: room.roomId };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
