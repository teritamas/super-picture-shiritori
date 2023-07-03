export enum RoomStatus {
  Waiting = "waiting",
  Playing = "playing",
  Completed = "completed",
  Failed = "failed",
}

// えしりとりルーム
export interface RoomDomain {
  roomId: string;
  createUserId: string;
  roomPassPhrase: string;
  chainCount: number;
  firstWord: string;

  // オプション
  roomName?: string;
  roomStatus?: RoomStatus;
  lastPhrase?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// えしりとりルームの登録リクエスト
export interface PostRoomRequest {
  roomPassPhrase: string;
  createUserId: string;
  chainCount: number;
}

// 保存する時に使う
export interface EntryRoom extends PostRoomRequest {
  roomId: string;
  createdAt: Date;
  firstWord: string;
  roomStatus?: RoomStatus;
}
export interface PostRoomResponse {
  roomId: string;
}
