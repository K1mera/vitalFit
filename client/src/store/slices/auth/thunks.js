import { collection, setDoc, doc } from "firebase/firestore"
import {credentialSignUp, loginWithEmailAndPass, resetPassword, signInWithGoogle} from "../../../firebase/providers"
import {checkingCredentials, checkingGoogleCredentials, login, logout, resetPasswordEmail} from "./authSlice"
import {firebaseDb} from "../../../firebase/config"
import {registerUserBDD} from "../../../firebase/registerUserBDD"
import getUser from "../../../firebase/getUser"

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

        const data = await getUser(uid);
        const role = data.role || 'user'
        
        dispatch(login( { email, uid, photoURL, displayName, role} ))
        // console.log();
    }
}

export const startGoogle = () => {
    return async( dispatch ) => {
        dispatch(checkingGoogleCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        
        
        dispatch(login(result))
        
    }
}

export const startCreateUser = ( email, password, displayName, role='user') => {
    return async( dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorCode } = await credentialSignUp( email, password, displayName, role )
        const user = await registerUserBDD({
          email,
          id: uid,
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