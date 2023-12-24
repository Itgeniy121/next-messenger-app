import { auth } from "@/firebase/firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";
const signInWithGoogle = async () =>{
    const provider = new GoogleAuthProvider()
    const result = (await signInWithPopup(auth,provider)).user
    if(result){
        Cookies.set('logged', 'true')
    }
    return result
}

const logOut = async () =>{
    await auth.signOut()
    Cookies.remove('logged')
}
export {signInWithGoogle, logOut}