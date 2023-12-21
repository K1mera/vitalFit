import {GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import {firebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( firebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        
        
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const credentialSignUp = async( email, password,  displayName ) => {
    try {
        const result = await createUserWithEmailAndPassword( firebaseAuth, email, password )
        const { uid, photoURL } = result.user;
        
        await updateProfile( firebaseAuth.currentUser, {
            displayName
        } );


        return {
          ok: true,
          displayName,
          email,
          photoURL,
          uid,
        };
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
          ok: false,
          errorMessage,
          errorCode,
        };  
    }
}

export const loginWithEmailAndPass = async(email, password) => {
    try {
        const res = await signInWithEmailAndPassword( firebaseAuth, email, password );
        const { uid, displayName, photoURL } = res.user
        return {
          ok: true,
          uid,
          displayName,
          photoURL,
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
          ok: false,
          errorMessage,
          errorCode,
        };  
    }
}

export const resetPassword = async(email) => {
    try {
        const res = await sendPasswordResetEmail( firebaseAuth, email )
        return {
            ok: true,
          successMessage: "Password reset email sent!",
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
          ok: false,
          errorMessage,
          errorCode,
        };  
    }
}