import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDK_-m-TEq12vGA8fEcOTWCQBohSd-SVXA",
  authDomain: "netflix-replica-49076.firebaseapp.com",
  projectId: "netflix-replica-49076",
  storageBucket: "netflix-replica-49076.appspot.com",
  messagingSenderId: "526357431176",
  appId: "1:526357431176:web:8f0ef3ee15b21ad434703d"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

  export { auth}
  export default db;