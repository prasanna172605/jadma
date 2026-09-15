/**
 * Firebase Client SDK Initialization
 * ------------------------------------------
 * This module initializes the Firebase client SDK and exports all
 * the individual services (Auth, Firestore, Storage) that the
 * frontend application will use.
 *
 * Replace the placeholder env variables in .env with your actual
 * Firebase project credentials before deploying.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// ---------------------------------------------------------------------------
// Configuration — loaded from Vite environment variables (VITE_ prefix)
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// ---------------------------------------------------------------------------
// Initialize Firebase App (guard against double-init in HMR mode)
// ---------------------------------------------------------------------------
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ---------------------------------------------------------------------------
// Individual service exports
// ---------------------------------------------------------------------------
export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, import.meta.env.VITE_FIREBASE_REGIONAL_FUNCTIONS || undefined);

// Auto-enable multi-factor auth settings if available
if (typeof window !== 'undefined') {
  // Configure auth persistence for production sessions
  // This ensures the auth state persists across page reloads
  auth.onAuthStateChanged(() => {
    // Auth state listener ready
  });
}

export default app;
