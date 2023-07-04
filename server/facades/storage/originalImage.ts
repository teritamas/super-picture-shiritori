import { bucket } from "../firebase";

const ORIGINAL_IMAGE_DIR = "originalImage";

/**
 * storageに画像をアップロードする
 */
export const uploadOriginalImage = async (image: Buffer, filename: string) => {
  const file = bucket.file(ORIGINAL_IMAGE_DIR + "/" + filename + ".png");
  try {
    console.log("[uploadImage]", image);
    await file.save(image);
    await file.setMetadata({ contentType: "image/png" });
  } catch (e) {
    console.error("[uploadImage]", e);
  }
};

/**
 * storageから画像をダウンロードする
 */
export const downloadOriginalImage = async (wordChainId: string) => {
  const file = bucket.file(ORIGINAL_IMAGE_DIR + "/" + wordChainId + ".png");
  try {
    const [data] = await file.download();
    return data;
  } catch (e) {
    console.error("[downloadImage]", e);
  }
};
