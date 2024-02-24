import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const app = initializeApp({
  apiKey: "AIzaSyC-2bvS87YvhAHZZt_vSCy934oTMndUXeA",
  authDomain: "messenger-next-68311.firebaseapp.com",
  projectId: "messenger-next-68311",
  storageBucket: "messenger-next-68311.appspot.com",
  messagingSenderId: "1027843025164",
  appId: "1:1027843025164:web:5805eb279984dfc4dfc129",
  measurementId: "G-E358T5XWKJ",
});

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)
export { firestore, auth, storage };
export default app;
