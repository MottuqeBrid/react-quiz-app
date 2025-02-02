import { initializeApp } from "firebase/app";

// // firebase configuration
const app = initializeApp({
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,

  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,

  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  databaseURL: import.meta.env.VITE_REACT_DATABASE_URL,
});
// firebase configuration
// const app = initializeApp({
//   apiKey: "AIzaSyC99cr8J_kTewV3i2CT9kLh3ytoIdOFTGc",
//   authDomain: "react-quize-dev-001.firebaseapp.com",
//   projectId: "react-quize-dev-001",
//   storageBucket: "react-quize-dev-001.firebasestorage.app",
//   messagingSenderId: "863590870748",
//   appId: "1:863590870748:web:9893ffcc9221e499400e19",
// });

export default app;
