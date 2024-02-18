// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD72u6-wYE73YJApFXZkjpRyGM0AG0WTXE",
  authDomain: "react-firebase-auth-b9138.firebaseapp.com",
  projectId: "react-firebase-auth-b9138",
  storageBucket: "react-firebase-auth-b9138.appspot.com",
  messagingSenderId: "274118759914",
  appId: "1:274118759914:web:be47026bc6aa925c900e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export default app
