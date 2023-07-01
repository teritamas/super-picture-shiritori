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
 * ユーザがしりとりの単語を入力した後のルームの更新処理(firestore-adminを利用)
 */
export async function updateRoomAfterInput(
  roomId: string,
  lastPhrase: string,
  nextRoomStatus: room.RoomStatus
) {
  try {
    const querySnapshot = firestore
      .collection("room")
      .doc(roomId)
      .update({
        roomStatus: nextRoomStatus,
        lastPhrase: lastPhrase,
        updatedAt: new Date(),
      });
  } catch (e) {
    console.error("[updateRoom]", e);
  }
}

/**
 * ルームの状態を取得する(firestore-adminを利用)
 */
export async function getRoom(roomId: string) {
  try {
    const querySnapshot = await firestore.collection("room").doc(roomId).get();
    const room: room.RoomDomain = querySnapshot.data() as room.RoomDomain;
    return room;
  } catch (e) {
    console.error("[getRoom]", e);
  }
}

/**
 * Firestoreの/roomからルームの一覧を取得する(firestore-adminを利用)
 */
export async function getRooms() {
  try {
    const querySnapshot = await firestore
      .collection("room")
      .orderBy("createdAt", "asc")
      .get();
    const rooms: room.RoomDomain[] = [];
    querySnapshot.forEach((doc) => {
      rooms.push(doc.data() as room.RoomDomain);
    });
    return rooms === undefined ? [] : rooms;
  } catch (e) {
    console.error("[getRooms]", e);
  }
}
