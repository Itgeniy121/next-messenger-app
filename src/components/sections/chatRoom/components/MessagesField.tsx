'use client'
import { firestore } from "@/firebase/firebase.config"
import { doc, onSnapshot } from "firebase/firestore"
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Message from "@/components/UI/features/Message"
import useAuth from "@/hooks/useAuth"
const MessagesField = () => {
  const[messages, setMessages] = useState<any>()
  const {user} = useAuth()
  const params = useParams()
  useEffect(() =>{
    const reference = doc(firestore, `chats/${params.chatId}`)
      const result = onSnapshot(reference, (doc) =>{
        doc.exists() && setMessages(doc.data().messages);
      })
      return () => {
        result()
      }
  }, [])

  return (
    <div id="messages" className='h-[85%] bg-[#E4EBF1] dark:bg-[#1c1e33] w-full flex flex-col justify-start items-start p-[10px] overflow-y-auto'>
      {messages && messages.map((m: any) =>(
        <Message user={user} message={m} key={m.uid}/>
      ))}
    </div>
  )
}

export default MessagesField