'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
const ThemeSwitcher = () => {

  const[lightMode, setLightMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  useEffect(() =>{
    setMounted(true)
    if(resolvedTheme == 'light'){
        setLightMode(true)
    }else setLightMode(false)
  })
  const switchTheme = () =>{
    if(lightMode == false){
      setTheme('light')
    }else setTheme('dark')
  }
  return (
    <div className='w-[85%] flex flex-col justify-start items-start mt-[50px]'>
      <p className='text-[#9495A4] text-[15px] font-[300]'>Оформление</p>
      <div className='w-full rounded-[5px] px-[10px] h-[50px] flex flex-row justify-between items-center bg-[#B5BFC6] dark:bg-[#24273C] mt-[5px]'>
        <p className='text-[14px] font-[200]'>Светлая тема</p>
        <div className = 'toggle-switch'>
            <label className='mylbl'>
                <input onClick={switchTheme} checked={lightMode} className='myinpt cursor-pointer' type = 'checkbox'/>
                <span className = 'slider'></span>
                </label>
            <a href = 'https://dribbble.com/shots/14199649-Dark-Light-Mode-Toggle-Switch-Pattern-A11y'>
            </a>
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher