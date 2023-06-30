// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1TFF9oqeYnyQso6a-fW19R15Q_sVnSlA",
  authDomain: "thinketh-app-db3ba.firebaseapp.com",
  projectId: "thinketh-app-db3ba",
  storageBucket: "thinketh-app-db3ba.appspot.com",
  messagingSenderId: "793487286062",
  appId: "1:793487286062:web:90c05756101d68a242a4bf",
  measurementId: "G-0EEXMX6RPZ",
};

// Initialize Firebase
// const analytics = getAnalytics(firebase.getApp());

if (firebase.getApps().length < 1) {
  const app = firebase.initializeApp(firebaseConfig);
  initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
}

export default { auth };
