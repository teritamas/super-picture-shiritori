import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { decryptGCPServiceAccount } from "../common/decrypt";

// ServiceAccountKeyを複合化する
const serviceAccountJsonString = decryptGCPServiceAccount();

const app = initializeApp({
  credential: cert(JSON.parse(serviceAccountJsonString)),
  storageBucket: "oasys-tokyo-hackjam.appspot.com",
});

export const firestore = getFirestore(app);
export const bucket = getStorage(app).bucket();
