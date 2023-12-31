import FormData from "form-data";
import fetch from "node-fetch";
import * as fs from "node:fs";

const engineId = "stable-diffusion-v1-5";
const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
const apiKey = process.env.DREAMSTUDIO_API_KEY;

if (!apiKey) throw new Error("Missing Stability API key.");

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

/**
 * 入力画像をDreamStudioAPIにリクエストしAIによる変換を行う。
 */
export async function editImage(prompt: string, image: Buffer) {
  const formData = new FormData();
  formData.append("init_image", image);
  formData.append("init_image_mode", "IMAGE_STRENGTH");
  formData.append("image_strength", 0.15);
  formData.append(
    "text_prompts[0][text]",
    `an comic style of ${prompt}, natural, best quality, masterpiece.`
  );
  formData.append("text_prompts[0][weight]", 0.8);
  formData.append("cfg_scale", 30);
  // formData.append("clip_guidance_preset", "FAST_BLUE");
  formData.append("style_preset", "enhance");
  formData.append("samples", 1);
  formData.append("seed", 1);
  formData.append("steps", 70);

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image`,
    {
      method: "POST",
      headers: {
        ...formData.getHeaders(),
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    console.error("Failed to generate image. Return Original Images.");
    console.error(await response.text());
    return image;
  }

  const responseJSON = (await response.json()) as GenerationResponse;

  // saveImage(responseJSON);
  return Buffer.from(responseJSON.artifacts[0].base64, "base64");
}

/**
 * 生成された画像をローカルに保存する
 */
function saveImage(responseJSON: GenerationResponse) {
  responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
      `v1_img2img_${index}.png`,
      Buffer.from(image.base64, "base64")
    );
  });
}
