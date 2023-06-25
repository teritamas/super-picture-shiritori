import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { decryptGCPServiceAccount } from "../common/decrypt";

// ServiceAccountKeyを複合化する
const serviceAccountJsonString = decryptGCPServiceAccount();

const app = initializeApp({
  credential: cert(JSON.parse(serviceAccountJsonString)),
});

export const firestore = getFirestore(app);
