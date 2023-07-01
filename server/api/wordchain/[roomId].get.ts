import { getWordChains } from "../../facades/repositories/wordChain";
import { WordChain } from "../../models/wordchain";

/**
 * 画像取得
 */
export default defineEventHandler(async (event) => {
  try {
    const roomId: string | undefined = event.context.params?.roomId;
    if (roomId === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    const wordChains: WordChain[] | undefined = await getWordChains(roomId);
    return wordChains === undefined ? [] : wordChains;
  } catch (e) {
    console.error("[Get]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to get wordChain",
    });
  }
});
