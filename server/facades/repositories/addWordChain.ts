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
