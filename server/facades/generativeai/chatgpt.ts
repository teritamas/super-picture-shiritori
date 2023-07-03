import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * 英語に翻訳する
 */
export async function translateEnglish(text: string) {
  const translation = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Translate ${text} into English. Please return only the string of the translation result`,
      },
    ],
  });
  return translation.data.choices[0].message?.content ?? "";
}

/**
 * しりとりが成立していることを確認する
 */
export async function checkShiritori(beforeWord: string, afterWord: string) {
  console.log(beforeWord, afterWord);
  const responseMessage = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Determine if the last letter of the previous word and the first letter of the next word have the similarly pronunciation.  
        If they are, return "true", otherwise return "false".
        Do not return strings other than all lowercase true or false.
        Previous word: ${beforeWord}
        Next word: ${afterWord}`,
      },
    ],
  });
  console.log(responseMessage.data.choices[0].message?.content);
  return responseMessage.data.choices[0].message?.content === "true"
    ? true
    : false;
}
