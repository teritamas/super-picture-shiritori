import { createError } from "h3";
import {
  EntryRoom,
  PostRoomRequest,
  PostRoomResponse,
  RoomStatus,
} from "../../models/room";
import { v4 as uuidv4 } from "uuid";
import { addRoom } from "../../facades/repositories/room";

const randomWords = ["おあしす", "えーあい", "うぇぶすりい", "おーえす"];

export default defineEventHandler(async (event) => {
  try {
    const body: PostRoomRequest = await readBody(event);

    // 配列からランダムに選択
    const firstWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];

    const room: EntryRoom = {
      ...body,
      roomId: uuidv4(),
      createdAt: new Date(),
      roomStatus: RoomStatus.Playing,
      firstWord: firstWord,
    };
    addRoom(room);
    return {
      roomId: room.roomId,
    } as PostRoomResponse;
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry room",
    });
  }
});
