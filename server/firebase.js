import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import 'firebase/firestore';

import {
  getFirestore,
  query,
  doc,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjlwHYhpUJ13Owo4Ds_kCWsaEyZGjHZTI",
  authDomain: "incomeexpene.firebaseapp.com",
  projectId: "incomeexpene",
  storageBucket: "incomeexpene.appspot.com",
  messagingSenderId: "1015316790867",
  appId: "1:1015316790867:web:5789402f7831a7513b90a6",
  measurementId: "G-07VM8LVDER"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// const ab=firestore();
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   authProvider: "google",
      //   email: user.email,
      // });
      const parentDocRef = doc(db, "users", user.uid); 
      const newDocRef = await setDoc(parentDocRef, { 
        uid: user.uid,
        name: user.displayName,
        photo:user.photoURL,
        authProvider: "google",
        email: user.email,
      }); 
      // console.log("Document added with ID: ", newDocRef.id);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
  
};
// const a=firebase.initializeApp(firebaseConfig);
// const firestore =app.firestore();

export {
  auth,
  db,
  storage,
  // firestore,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};