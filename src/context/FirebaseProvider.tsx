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
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";

type FirebaseContextType = {
  user: User | null;
  signInWithCredentials: (email: string, password: string) => Promise<Boolean>;
  signUpWithCredentials: (email: string, password: string) => Promise<Boolean>;
  signInWithGoogle: () => void;
};

const FirebaseContext = createContext<FirebaseContextType>(
  {} as FirebaseContextType,
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
        setUser(null);
      }
    });
  }, [firebaseAuth]);

  const signUpWithCredentials = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return true;
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
      return false;
    }
  };

  const signInWithCredentials = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return true;
    } catch (error: any) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credential");
          break;
        case "auth/invalid-password":
          toast.error("Invalid password");
          break;
        case "auth/user-not-found":
          toast.error("User not found. Please sign up");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
      return false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      return true;
    } catch (error: any) {
      console.log(error.code);
      switch (error.code) {
        case "auth/cancelled-popup-request":
          toast.error("Popup closed by user");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
      return false;
    }
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
