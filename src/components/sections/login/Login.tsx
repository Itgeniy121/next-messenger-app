"use client"
import { auth } from "@/firebase/firebase.config";
import {useAuthState} from 'react-firebase-hooks/auth'
import { signInWithGoogle } from "@/utils/firebaseAuth";
import { useRouter } from "next/navigation";
import GoogleButton from "./components/GoogleButton";
import LoginForm from "./components/LoginForm";
const Login = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const test = () =>{
    if(user){
      router.push('/')
    }else{
      signInWithGoogle().then((val)=>{
        if(val){
          router.push('/')
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  return(
    <div className="bg-[#25273E] px-[20px] py-[20px] flex flex-col justify-start items-center rounded-[5px] w-full h-[100vh] bM:w-[400px] bM:h-[570px]">
      <h1 className="Manr text-[20px] mb-[20px]">Привет 🤟</h1>
      <GoogleButton/>
      <h1 className="Manr text-[15px] my-[15px]">или</h1>
      <div className="border-[#9495A4] border-b w-[100%]"></div>
      <LoginForm/>
    </div>
  )
};

export default Login;
