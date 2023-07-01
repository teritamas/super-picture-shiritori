import { bucket } from "../firebase";

const GENERATED_IMAGE_DIR = "generatedImage";

/**
 * storageに画像をアップロードする
 */
export const uploadImage = async (image: Buffer, filename: string) => {
  const file = bucket.file(GENERATED_IMAGE_DIR + "/" + filename + ".png");
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
export const downloadImage = async (wordChainId: string) => {
  const file = bucket.file(GENERATED_IMAGE_DIR + "/" + wordChainId + ".png");
  try {
    const [data] = await file.download();
    return data;
  } catch (e) {
    console.error("[downloadImage]", e);
  }
};
