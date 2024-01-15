import { collection, setDoc, doc } from "firebase/firestore"
import {credentialSignUp, loginWithEmailAndPass, resetPassword, signInWithGoogle} from "../../../firebase/providers"
import {checkingCredentials, checkingGoogleCredentials, login, logout, resetPasswordEmail} from "./authSlice"
import {firebaseDb} from "../../../firebase/config"

export const getLogout = () => {
    return async( dispatch ) => {
        dispatch(logout())
    }
}

export const loginWithEmail = (email, password) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, displayName, errorCode } = await loginWithEmailAndPass(
          email,
          password
        );

        if (!ok) return dispatch(logout(errorCode));
        

        dispatch(login( {email, uid, photoURL, displayName, role} ))
        // console.log();
    }
}

export const startGoogle = () => {
    return async( dispatch ) => {
        dispatch(checkingGoogleCredentials());
        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch(logout())
         const modifiedResult = {
           ...result,
           role: "user", 
         };
        console.log(modifiedResult);
        
        dispatch(login(modifiedResult))
        
    }
}

export const startCreateUser = ( email, password, displayName, role='user') => {
    return async( dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorCode } = await credentialSignUp( email, password, displayName, role )
        const newUser = doc(collection(firebaseDb, `/users/${ uid }/user`));
        const loadUser = await setDoc(newUser, {
          email,
          uid,
          photoURL,
          displayName,
          role,
        });


        if (!ok) return dispatch(logout(errorCode))
        dispatch(login({ email, uid, photoURL, displayName, role }))
        
    }
}

export const startResetingPassword = (email) => {
    return async( dispatch ) => {
        const resp = await resetPassword(email)
        console.log(resp);
        if (!resp.ok) return dispatch(resetPasswordEmail(resp.errorCode));
        dispatch(resetPasswordEmail(resp.successMessage));
    }
}