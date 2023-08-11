import { RoomStatus } from "./room";

// シングルユーザルームのモデル
export interface PostSingleUserRoomRequest {
  chainCount: number;
}
export interface EntrySingleUserRoom extends PostSingleUserRoomRequest {
  singleUserRoomId: string;
  createdAt: Date;
  firstWord: string;
  roomStatus: RoomStatus;
  lastPhrase: string;
}
export interface PostSingleUserRoomResponse {
  singleUserRoomId: string;
}
