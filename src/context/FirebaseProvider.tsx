import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

type FirebaseContextType = {
  user: User | null;
  signInWithCredentials: (email: string, password: string) => void;
  signUpWithCredentials: (email: string, password: string) => void;
  signInWithGoogle: () => void;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined,
);

const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("user not logged in");
        setUser(null);
      }
    });
  }, [firebaseAuth]);

  const signUpWithCredentials = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      console.log(result);
    } catch (error: any) {
      console.log(error.message, error.code);
    }
  };

  const signInWithCredentials = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      console.log(result);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), googleProvider);
    //try {
    //  const userCred = signInWithPopup(firebaseAuth, googleProvider);
    //  console.log(userCred);
    //} catch (error: any) {
    //  console.error(error);
    //  console.log(error.message);
    //}
  };

  return (
    <FirebaseContext
      value={{
        user,
        signInWithCredentials,
        signUpWithCredentials,
        signInWithGoogle,
      }}
    >
      {children}
    </FirebaseContext>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
