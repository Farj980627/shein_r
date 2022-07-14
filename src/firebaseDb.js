import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyByyZXFZeFckQQeMHdWpZmniOi-SbVKTGY",
    authDomain: "sheinregister-927.firebaseapp.com",
    projectId: "sheinregister-927",
    storageBucket: "sheinregister-927.appspot.com",
    messagingSenderId: "867577915600",
    appId: "1:867577915600:web:c234af756a7d29607216d5",
    measurementId: "G-TPPTQM2VYZ"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();