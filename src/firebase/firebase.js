import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMLik5qHZwNG7rTPNBRNpYa7IUbFXoZS8",
  authDomain: "organcare3d.firebaseapp.com",
  projectId: "organcare3d",
  storageBucket: "organcare3d.firebasestorage.app",
  messagingSenderId: "628358768059",
  appId: "1:628358768059:web:7a1c34492af59cfa6f909e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };