// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { useContext, useEffect, useState } from "react";
// import "./firebase";

// const AuthContext = React.createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState();
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//     //   const unsubscribe = auth.onAuthStateChanged((user) => {
//     //     setCurrentUser(user);
//     //     setLoading(false);
//     //   });
//   }, []);

//   //   signup function
//   async function signup(email, password, username) {
//     const auth = getAuth();
//     await createUserWithEmailAndPassword(auth, email, password);
//     // updateProfile
//     await updateProfile(auth.currentUser, {
//       displayName: username,
//     });
//     const user = auth.currentUser;
//     setCurrentUser({
//       ...user,
//     });
//   }

//   // login function
//   function login(email, password) {
//     const auth = getAuth();
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // log out function
//   function logout() {
//     const auth = getAuth();
//     return signOut(auth);
//   }

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//   };
//   <AuthContext.Provider value={value}>
//     {!loading && children}
//   </AuthContext.Provider>;
// }
// this chatGpt
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Clean up subscription on unmount
  }, []);

  async function signup(email, password, username) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error; // Re-throw to handle in components if needed
    }
  }

  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      // console.error("Login error:", error.message);
      throw error; // Re-throw to handle in components
    });
  }

  function logout() {
    const auth = getAuth();
    return signOut(auth).catch((error) => {
      console.error("Logout error:", error.message);
      throw error; // Re-throw to handle in components
    });
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
