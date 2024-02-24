'use client'
import useAuth from "@/hooks/useAuth"
import { useLayoutEffect } from "react"
import SideBar from "@/components/UI/SideBar"
import Profile from "@/components/sections/profile/Profile"
import { useRouter, useParams } from "next/navigation"
const page = () => {
    const {user, isLoading} = useAuth()
    const params: any = useParams()
    const router = useRouter()
    useLayoutEffect(() => {
        if(!user && !localStorage.getItem('logged')){
          router.push('/login')
        }
      },[])
  return (
    <div className="w-full bg-[#E4EBF1] dark:bg-[#1c1e33] h-[100vh] flex flex-row-reverse justify-center items-start relative">
        {isLoading && <span className="loader2 absolute top-[50%] left-[50%]"></span>}
        {!isLoading && (
            <>
            <Profile user={user} params={params?.profileId}/>
            <SideBar user={user}/>
            </>
        )}  
    </div>
  )
}

export default page