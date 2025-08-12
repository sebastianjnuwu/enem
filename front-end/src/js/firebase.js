
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';

import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js';

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
getRedirectResult, onAuthStateChanged } from
'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

window.API = "http://0.0.0.0:8080";

const encode = (data) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  
const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyBLkMv2N_cnG6q-9spUj01wvxRnfWSr6XY",
  authDomain: "cookie-brasil.firebaseapp.com",
  projectId: "cookie-brasil",
  storageBucket: "cookie-brasil.appspot.com",
  messagingSenderId: "202105498916",
  appId: "1:202105498916:web:d161e68c42e66c8f8997b1",
  measurementId: "G-6KZE06S4SF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/documents');
provider.addScope('https://www.googleapis.com/auth/drive');



async function LogEvent(name, params = {}) {
  console.log('[Analytics] event:', name, params);
  await logEvent(analytics, name, params);
}



async function signInWithGoogle() {
  
  try {
    
  const result = await signInWithPopup(auth, provider);
    
  const { accessToken } = GoogleAuthProvider.credentialFromResult(result);
    
  const id = await result.user.getIdToken();
    
  Cookies.set("accessToken", accessToken);
    
  return await fetch(window.API + '/user/login', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
 
  } catch (err) {
    return err.message;
  }
}

$("#login_google").on("click", async () => {
    
    const login = await signInWithGoogle();
    const user = await login.json();

    Cookies.set("USER", encode(user), { expires: 55 / (60 * 24) });
    
    $('#button-1').attr('href', 'aluno.html');
    $('#button-2').attr('hidden', false);
    $('#login_google').attr('hidden', true);
    
  });
  