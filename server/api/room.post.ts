import type { IncomingMessage, ServerResponse } from "http";
import { createError } from "h3";
import { addRoom } from "../facades/room";
import { PostRoomRequest } from "../models/rooom";

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const buffers = [];

    // TODO: 疎通確認のため残す。後で消す
    // for await (const chunk of req) {
    //   buffers.push(chunk);
    // }

    // let body = Buffer.concat(buffers).toString();

    // if (!body) {
    //   body = "[]";
    // }
    const sampleRequest: PostRoomRequest = {
      roomId: "test",
    };

    addRoom(sampleRequest);

    return sampleRequest.roomId;
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry room",
    });
  }
};
