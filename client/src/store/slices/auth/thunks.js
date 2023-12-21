import {credentialSignUp, loginWithEmailAndPass, resetPassword, signInWithGoogle} from "../../../firebase/providers"
import {checkingCredentials, checkingGoogleCredentials, login, logout, resetPasswordEmail} from "./authSlice"

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

        dispatch(login( {email, uid, photoURL, displayName} ))
        console.log();
    }
}

export const startGoogle = () => {
    return async( dispatch ) => {
        dispatch(checkingGoogleCredentials());
        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch(logout())
        
        dispatch(login(result))
        
    }
}

export const startCreateUser = (displayName, email, password) => {
    return async( dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorCode } = await credentialSignUp( email, password, displayName )
        
        if (!ok) return dispatch(logout(errorCode))
        dispatch(login({ email, uid, photoURL, displayName }))
        
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