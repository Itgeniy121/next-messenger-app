'use client'
import React from 'react'
import useAuth from "@/hooks/useAuth"
import { useLayoutEffect } from "react"
import SideBar from "@/components/UI/SideBar"
import { useRouter } from 'next/navigation'
import Settings from '@/components/sections/settings/Settings'
const page = () => {
    const router = useRouter()
    const {user, isLoading} = useAuth()
    useLayoutEffect(() => {
        if(!user && !localStorage.getItem('logged')){
          router.push('/login')
        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
  return (
    <div className="w-full bg-[#E4EBF1] dark:bg-[#1c1e33] h-[100vh] flex flex-row-reverse justify-center items-start relative">
        {isLoading && <span className="loader2 absolute top-[50%] left-[50%]"></span>}
        {!isLoading && (
            <>
            <Settings user={user}/>
            <SideBar user={user}/>
            </>
        )} 
    </div>
  )
}

export default page