import { createError } from "h3";
import { v4 as uuidv4 } from "uuid";
import { PostWordChainRequest, WordChain } from "../../models/wordchain";
import {
  addWordChain,
  getWordChains,
} from "../../facades/repositories/wordChain";
import { uploadImage } from "../../facades/storage/generatedImage";
import { editImage } from "../../facades/generativeai/stability";
import { Buffer } from "buffer";
import { getRoom, updateRoomAfterInput } from "../../facades/repositories/room";
import { RoomDomain, RoomStatus } from "../../models/room";

/**
 * ユーザのしりとりの入力に応じて次の部屋のステータスを検証する
 */
async function checkNextRoomStatus(roomId: string, word: string) {
  const room: RoomDomain | undefined = await getRoom(roomId);
  const wordChains: WordChain[] | undefined = await getWordChains(roomId);
  if (room === undefined || wordChains === undefined) {
    throw new Error("RoomId is not found");
  }

  if (room.chainCount > wordChains.length + 1) {
    // まだ規定数のしりとりが行われていない時
    return RoomStatus.Playing; // 部屋のステータスはゲームが続行中
  } else {
    return RoomStatus.Completed; // 部屋のステータスを完了にする
  }
}

/**
 * file画像を変換してstorageにアップロードする
 */
async function convertAndUploadImage(file: Buffer, wordChain: WordChain) {
  const base64Data = file.toString().split(",")[1];
  const decodedData = Buffer.from(base64Data, "base64");

  const image =
    process.env.MODE === "development"
      ? decodedData
      : await editImage(wordChain.word, decodedData);
  // fs.writeFileSync("temp.png", decodedData); // デバッグ様にローカルに保存
  await uploadImage(image, wordChain.wordChainId);
}

export default defineEventHandler(async (event) => {
  try {
    if (event === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    const data: MultiPartData[] | undefined = await readMultipartFormData(
      event
    );

    // リクエストボディが取得できなかった場合はエラー
    if (data === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    // リクエストボディとファイルを取得
    let requestBody: PostWordChainRequest | undefined = undefined;
    let file: Buffer | undefined = undefined;
    for (const d of data) {
      if (d.name === "request") {
        requestBody = {
          ...JSON.parse(d.data.toString()),
        };
      } else if (d.name === "file") {
        file = d.data;
      }
    }
    const roomId: string | undefined = event.context.params?.roomId;
    if (!(requestBody && file && roomId)) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    // DBに登録
    const createdAt: Date = new Date();
    const wordChain: WordChain = {
      ...requestBody,
      roomId: roomId,
      wordChainId: uuidv4(),
      createdAt: createdAt,
    };

    // TODO: 直前の単語と続いていることを確認する
    const nextRoomStatus: RoomStatus = await checkNextRoomStatus(
      roomId,
      requestBody.word
    );

    // GCPに保存する処理
    await addWordChain(wordChain);
    await updateRoomAfterInput(roomId, nextRoomStatus);
    await convertAndUploadImage(file, wordChain);

    return {
      wordChainId: wordChain.wordChainId,
    };
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry wordChain",
    });
  }
});
