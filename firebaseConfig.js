// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDp78HeaItJCBFqTllG0N_pYzQMDA_fI0Y",
  authDomain: "lumi-studio-e5ba3.firebaseapp.com",
  projectId: "lumi-studio-e5ba3",
  storageBucket: "lumi-studio-e5ba3.appspot.com",
  messagingSenderId: "274144437642",
  appId: "1:274144437642:web:4f2d4d11214432a1545473",
  measurementId: "G-07XVH13GW5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };