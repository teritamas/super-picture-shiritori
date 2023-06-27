import { createError } from "h3";
import { RoomDomain } from "../../models/room";
import { getRooms } from "../../facades/repositories/room";

export default defineEventHandler(async (event) => {
  try {
    // room一覧取得
    const rooms: RoomDomain[] | undefined = await getRooms();
    return rooms === undefined ? [] : rooms;
  } catch (e) {
    console.error("[Get]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to get room",
    });
  }
});
