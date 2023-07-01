export interface WordChain {
  word: string;
  roomId: string;
  wordChainId: string;

  // オプション
  createdAt: Date;
  updatedAt?: Date;
}

export interface PostWordChainRequest {
  word: string;
}
