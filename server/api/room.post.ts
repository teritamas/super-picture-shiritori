import { createError } from "h3";
import { addRoom } from "../facades/room";
import { EntryRoom, PostRoomRequest } from "../models/room";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  try {
    const body: PostRoomRequest = await readBody(event);

    const room: EntryRoom = {
      ...body,
      roomId: uuidv4(),
    };
    addRoom(room);
    return {
      roomId: room.roomId,
    };
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry room",
    });
  }
});
