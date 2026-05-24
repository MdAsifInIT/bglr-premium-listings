import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "@/src/dataconnect-generated";

// These values are completely safe to expose to your frontend code client-side
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent multi-instance pooling errors during Next.js Hot Module Reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize your compiled Data Connect client container instance
export const dataConnectClient = getDataConnect(app, connectorConfig);

// Automatically bind to local emulators during development runs
if (process.env.NODE_ENV === "development") {
    connectDataConnectEmulator(dataConnectClient, "127.0.0.1", 9399);
}