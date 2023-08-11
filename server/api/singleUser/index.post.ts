import { createError } from "h3";
import { v4 as uuidv4 } from "uuid";
import {
  EntrySingleUserRoom,
  PostSingleUserRoomRequest,
  PostSingleUserRoomResponse,
} from "../../models/singleUserRoom";
import { RoomStatus } from "../../models/room";
import { addSingleUserRoom } from "../../facades/repositories/singleUserRoom";

const randomWords = ["おあしす", "えーあい", "うぇぶすりい", "おーえす"];

export default defineEventHandler(async (event) => {
  try {
    console.log("event", event);
    const body: PostSingleUserRoomRequest = await readBody(event);

    // 配列からランダムに選択
    const firstWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];

    const singleUserRoom: EntrySingleUserRoom = {
      ...body,
      singleUserRoomId: uuidv4(),
      createdAt: new Date(),
      roomStatus: RoomStatus.Playing,
      firstWord: firstWord,
      lastPhrase: firstWord[firstWord.length - 1],
    };
    addSingleUserRoom(singleUserRoom);
    return {
      singleUserRoomId: singleUserRoom.singleUserRoomId,
    } as PostSingleUserRoomResponse;
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry single room",
    });
  }
});
