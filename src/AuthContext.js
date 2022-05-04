import { useContext, useState, useEffect, createContext } from 'react';
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "./firebase"
export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      signInWithEmailAndPassword(auth, email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
  const signout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);
const value = {
    currentUser,
    signin,
    signout
};
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}