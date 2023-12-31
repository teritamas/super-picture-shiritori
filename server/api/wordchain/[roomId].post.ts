import { createError, MultiPartData } from "h3";
import { v4 as uuidv4 } from "uuid";
import { PostWordChainRequest, WordChain } from "../../models/wordchain";
import {
  addWordChain,
  getWordChains,
} from "../../facades/repositories/wordChain";
import { uploadGenerateImage } from "../../facades/storage/generatedImage";
import { editImage } from "../../facades/generativeai/stability";
import { Buffer } from "buffer";
import { getRoom, updateRoomAfterInput } from "../../facades/repositories/room";
import { RoomDomain, RoomStatus } from "../../models/room";
import {
  checkShiritori,
  translateEnglish,
} from "../../facades/generativeai/chatgpt";
import { uploadOriginalImage } from "../../facades/storage/originalImage";

/**
 * ユーザのしりとりの入力に応じて次の部屋のステータスを検証する
 */
async function checkNextRoomStatus(roomId: string, word: string) {
  const room: RoomDomain | undefined = await getRoom(roomId);
  const wordChains: WordChain[] | undefined = await getWordChains(roomId);
  if (room === undefined || wordChains === undefined) {
    throw new Error("RoomId is not found");
  }

  // 部屋の直前の単語の最後の文字と、今回の単語の最初の文字が一致しているか(しりとりが続いているか)を確認
  console.log(room.lastPhrase, word[0]);
  if (room.lastPhrase && room.lastPhrase !== word[0]) {
    // if (room.lastPhrase && !(await checkShiritori(room.lastPhrase!, word))) {
    return RoomStatus.Failed; // 部屋のステータスを失敗にする
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
async function convertAndUploadImage(
  file: Buffer,
  wordChainId: string,
  wordEnglish: string
) {
  const base64Data = file.toString().split(",")[1];
  const originalImage = Buffer.from(base64Data, "base64");

  const generateImage =
    process.env.MODE === "development"
      ? originalImage
      : await editImage(wordEnglish, originalImage);
  // fs.writeFileSync("temp.png", decodedData); // デバッグ様にローカルに保存
  await uploadGenerateImage(generateImage, wordChainId);
  await uploadOriginalImage(originalImage, wordChainId);
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
      event!
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
    // 各パラメータが取得できなかったらエラー
    const roomId: string | undefined = event.context.params?.roomId;
    if (!(requestBody && file && roomId)) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    // 直前の単語と続いていることを確認する
    const nextRoomStatus: RoomStatus = await checkNextRoomStatus(
      roomId,
      requestBody.word
    );

    // しりとりを保存する
    const wordChain: WordChain = {
      ...requestBody,
      roomId: roomId,
      wordChainId: uuidv4(),
      createdAt: new Date(),
    };
    await addWordChain(wordChain);

    // 入力の最後の文字を取得しルームを更新
    const lastPhrase: string = requestBody.word[requestBody.word.length - 1];
    await updateRoomAfterInput(roomId, lastPhrase, nextRoomStatus);

    const translatedWord: string = await translateEnglish(requestBody.word);
    await convertAndUploadImage(file, wordChain.wordChainId, translatedWord);

    return {
      wordChainId: wordChain.wordChainId,
      nextRoomStatus: nextRoomStatus,
    };
  } catch (e) {
    console.error("[Entry]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to entry wordChain",
    });
  }
});
