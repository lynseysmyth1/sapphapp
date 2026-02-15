/**
 * Firebase Auth for social sign-in (Google, Apple).
 * Configure via VITE_FIREBASE_* in .env.
 * @see .env.example
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

let app = null;
let auth = null;

function isConfigured() {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

export function isFirebaseConfigured() {
  return isConfigured();
}

export function getFirebaseAuth() {
  if (!isConfigured()) return null;
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth;
}

/**
 * Sign in with Google (popup). Works for both sign-in and create-account.
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase is not configured');
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

/**
 * Sign in with Apple (popup). Works for both sign-in and create-account.
 * Requires Apple provider enabled in Firebase Console.
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signInWithApple() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase is not configured');
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider);
}

/**
 * Check for redirect result (e.g. after signInWithRedirect). Call once on app load.
 * @returns {Promise<import('firebase/auth').UserCredential | null>}
 */
export async function getAuthRedirectResult() {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  return getRedirectResult(auth);
}

export { signInWithRedirect };
