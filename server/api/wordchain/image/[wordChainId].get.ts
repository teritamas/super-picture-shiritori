import { downloadImage } from "../../../facades/storage/generatedImage";

/**
 * 一覧取得
 */
export default defineEventHandler(async (event) => {
  try {
    const wordChainId: string | undefined = event.context.params?.wordChainId;
    if (wordChainId === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    const image = await downloadImage(wordChainId);
    return image === undefined ? [] : image;
  } catch (e) {
    console.error("[Get]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to get wordChain",
    });
  }
});
