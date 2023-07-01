import { createError } from "h3";
import { RoomDomain } from "../../models/room";
import { getRoom } from "../../facades/repositories/room";

export default defineEventHandler(async (event) => {
  try {
    // roomの詳細取得
    const roomId: string | undefined = event.context.params?.roomId;
    if (roomId === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "RoomId Not Found",
      });
    }

    const room: RoomDomain | undefined = await getRoom(roomId);
    return room!;
  } catch (e) {
    console.error("[Get]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to get room",
    });
  }
});
