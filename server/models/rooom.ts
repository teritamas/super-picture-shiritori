import * as e from "express";

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
  roomStatus?: RoomStatus;
  roomPassPhrase: string;
  createdAt: Date;
  updatedAt: Date;

  // オプション
  roomName?: string;
}

// えしりとりルーム
export interface PostRoomRequest {
  roomId: string;
}
