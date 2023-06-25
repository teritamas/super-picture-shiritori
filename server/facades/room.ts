import { EntryRoom, PostRoomRequest } from "../models/room";
import { firestore } from "./firestore";

/**
 * FireStoreの/roomにルームを追加する(firestore-adminを利用)
 */
export function addRoom(room: EntryRoom) {
  try {
    const querySnapshot = firestore
      .collection("room")
      .doc(room.roomId)
      .set(room);
    const result = querySnapshot.then(() => {
      return room;
    });
  } catch (e) {
    console.error("[addRoom]", e);
  }
}
