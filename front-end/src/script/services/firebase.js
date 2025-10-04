import { initializeApp } from
'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';

import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

const app = initializeApp({
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const analytics = getAnalytics(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/documents');
provider.addScope('https://www.googleapis.com/auth/drive');

export async function LogEvent(name, params = {}) {
  console.log('[Analytics] Event:', name, params);
  await logEvent(analytics, name, params);
}

export async function signInWithGoogle() {
  
  try {
    
  const result = await signInWithPopup(auth, provider);
  
  const { accessToken } = GoogleAuthProvider.credentialFromResult(result);
  
  const user = await result.user;
  const id = await result.user.getIdToken();

  console.log('[Firebase] User signed in:', user);

  return { id, accessToken, user };
    
  } catch (err) {
    console.error('[Firebase] Error during sign-in:', err);
    return false;
  }
}
