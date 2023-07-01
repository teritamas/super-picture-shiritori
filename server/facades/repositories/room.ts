import * as room from "../../models/room";
import { firestore } from "../firebase";

/**
 * FireStoreの/roomにルームを追加する(firestore-adminを利用)
 */
export function addRoom(room: room.EntryRoom) {
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
 * Firestoreの/roomからルームの最終更新時間を(firestore-adminを利用)
 */
export async function updateRoomUpdatedAt(roomId: string) {
  try {
    const querySnapshot = firestore
      .collection("room")
      .doc(roomId)
      .update({ updatedAt: new Date() });
  } catch (e) {
    console.error("[updateRoom]", e);
  }
}

/**
 * Firestoreの/roomからルームの一覧を取得する(firestore-adminを利用)
 */
export async function getRooms() {
  try {
    const querySnapshot = await firestore.collection("room").get();
    const rooms: room.RoomDomain[] = [];
    querySnapshot.forEach((doc) => {
      rooms.push(doc.data() as room.RoomDomain);
    });
    return rooms === undefined ? [] : rooms;
  } catch (e) {
    console.error("[getRooms]", e);
  }
}
