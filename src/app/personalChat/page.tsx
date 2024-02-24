'use client'
import SideBar from "@/components/UI/SideBar"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
const page = () => {
    const {user, isLoading} = useAuth()
    const router = useRouter()
    useLayoutEffect(() => {
      if(!user && !localStorage.getItem('logged')){
        router.push('/login')
      }
    },[])
  return (
    <div className="flex flex-row justify-start items-start h-[100vh] bm:mt-[5%]">
        {isLoading && <span className="loader2 absolute top-[50%] left-[50%]"></span>}
        {!isLoading && (
            <>
            <SideBar user={user}/>
            </>
        )}
    </div>
  )
}

export default page