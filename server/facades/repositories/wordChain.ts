import { WordChain } from "../../models/wordchain";
import { firestore } from "../firebase";

/**
 * FireStoreの/wordChainにしりとりを追加する(firestore-adminを利用)
 */
export async function addWordChain(wordChain: WordChain) {
  try {
    const querySnapshot = firestore
      .collection("wordChain")
      .doc(wordChain.wordChainId)
      .set(wordChain);
  } catch (e) {
    console.error("[addWordChain]", e);
  }
}

/**
 * Firestoreの/wordChainの一覧を取得する
 */
export async function getWordChains(roomId: string) {
  try {
    // 日付が早い順に並び替える
    const querySnapshot = await firestore
      .collection("wordChain")
      .where("roomId", "==", roomId)
      // .orderBy("createdAt", "asc")
      .get();
    const wordChains: WordChain[] = [];
    querySnapshot.forEach((doc) => {
      wordChains.push(doc.data() as WordChain);
    });
    return wordChains;
  } catch (e) {
    console.error("[getWordChains]", e);
  }
}
