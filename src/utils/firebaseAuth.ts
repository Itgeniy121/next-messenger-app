import { auth, firestore } from "@/firebase/firebase.config";
import { signInWithPopup, GoogleAuthProvider, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
const signInWithGoogle = async () =>{
    const provider = new GoogleAuthProvider()
    const result = (await signInWithPopup(auth,provider)).user
    if(result){
        const date = new Date()
        const userRefForChats = doc(firestore, `usersChats/${result.uid}`)
        const res = (await getDoc(userRefForChats)).data()
        const allUsers = doc(firestore, `users/${result.uid}`)
        await setDoc(allUsers, {
        name: result.displayName,
        uid: result.uid,
        email: result.email,
        date: date.toLocaleDateString('ru-RU'),
        photoUrl: result.photoURL
        })
        if(res == undefined){
            await setDoc(userRefForChats, {
            })
        }else{
            console.log('google sign in')
        }
        localStorage.setItem('logged', 'true')
    }
    return result
}
const createNewUser = async (email: string, password: string, name: string) =>{
    console.log(name)
    const user = await createUserWithEmailAndPassword(auth, email, password).catch((val)=>{
        if(val.message === "Firebase: Error (auth/email-already-in-use)."){
            toast.error('Пользователь с такими данными уже существует', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }else{
            toast.error('Что-то пошло не так', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    })
    if(auth.currentUser){
        await updateProfile(auth.currentUser, {
            displayName: name,
        })
    }
    const date = new Date()
    if(user){
        localStorage.setItem('logged', 'true')
        const allUsers = doc(firestore, `users/${user.user.uid}`)
        await setDoc(allUsers, {
        name: name,
        uid: user.user.uid,
        email: email,
        password: password,
        date: date.toLocaleDateString('ru-RU'),
        })
        const userChats = doc(firestore, `usersChats/${user.user.uid}`)
        await setDoc(userChats, {
        })
        toast.success('Аккаунт почти создан. Подожди немного!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return user.user
    }
}
const signInUser = async (email: string, password: string) =>{
    await signInWithEmailAndPassword(auth, email, password).then(()=>{
        toast.success('Добро пожаловать', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            localStorage.setItem('logged', 'true')
    }).catch(()=>{
        toast.error('Пользователь с такими данными не найден', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    })
}

const logOut = async () =>{
    await auth.signOut()
    localStorage.removeItem('logged')
    toast.success('До встречи 👋', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}
export {signInWithGoogle, logOut, createNewUser, signInUser}