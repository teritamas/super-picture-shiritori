import { downloadGenerateImage } from "../../../facades/storage/generatedImage";
import { downloadOriginalImage } from "../../../facades/storage/originalImage";

/**
 * 画像取得
 */
export default defineEventHandler(async (event) => {
  try {
    const wordChainId: string | undefined = event.context.params?.wordChainId;
    const { type } = getQuery(event);
    if (wordChainId === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    const image =
      type === "generated"
        ? await downloadGenerateImage(wordChainId)
        : await downloadOriginalImage(wordChainId);
    return image === undefined ? [] : image;
  } catch (e) {
    console.error("[Get]", e);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to get wordChain",
    });
  }
});
