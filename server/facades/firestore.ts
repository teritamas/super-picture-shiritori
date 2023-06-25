import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { decryptGCPServiceAccount } from "../common/decrypt";

// ServiceAccountKeyを複合化する
decryptGCPServiceAccount();

const app = initializeApp({
  credential: applicationDefault(),
});

export const firestore = getFirestore(app);
