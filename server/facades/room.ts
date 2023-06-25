import { EntryRoom, PostRoomRequest, RoomDomain } from "../models/room";
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
  } catch (e) {
    console.error("[addRoom]", e);
  }
}

/**
 * Firestoreの/roomからルームの一覧を取得する(firestore-adminを利用)
 */
export async function getRooms() {
  try {
    const querySnapshot = await firestore.collection("room").get();
    const rooms: RoomDomain[] = [];
    querySnapshot.forEach((doc) => {
      rooms.push(doc.data() as RoomDomain);
    });
    return rooms === undefined ? [] : rooms;
  } catch (e) {
    console.error("[getRooms]", e);
  }
}
