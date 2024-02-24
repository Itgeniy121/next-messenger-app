"use client"
import React from 'react'
import AuthForm from './components/AuthForm'
const Auth = () => {
  return (
    <div className="dark:bg-[#25273E] bg-[#B5BFC6] relative px-[20px] py-[20px] flex flex-col justify-start items-center rounded-[5px] w-full h-[100vh] bM:w-[400px] bM:h-[620px]">
      <h1 className="Manr text-[15px] mb-[20px] extramin:text-[20px]">Давайте сперва созадим аккаунт 🏠</h1>
      <div className="border-[#9495A4] border-b w-[100%]"></div>
      <AuthForm/>
    </div>
  )
}

export default Auth