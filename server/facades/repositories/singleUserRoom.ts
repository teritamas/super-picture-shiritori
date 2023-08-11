import { EntrySingleUserRoom } from "../../models/singleUserRoom";
import { firestore } from "../firebase";

/**
 * FireStoreの/singleUserRoomにルームを追加する(firestore-adminを利用)
 */
export function addSingleUserRoom(room: EntrySingleUserRoom) {
  try {
    const querySnapshot = firestore
      .collection("singleUserRoom")
      .doc(room.singleUserRoomId)
      .set(room);
  } catch (e) {
    console.error("[addSingleUserRoom]", e);
  }
}
