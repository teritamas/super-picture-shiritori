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
  roomPassPhrase: string;
  chainCount: number;

  // オプション
  roomName?: string;
  roomStatus?: RoomStatus;
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
}
