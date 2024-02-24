import Image from "next/image"
import message from "@/assets/send-svgrepo-com (1).svg"
import uploadPhoto from "@/assets/upload.png"
import { useState } from "react"
import { useParams } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import frog from "@/assets/frog.png"
import EmojiPicker from "emoji-picker-react"
import { sendOnlyTextMessage, sendTextWithImageMessage } from "@/utils/userChatting"
const InputField = () => {
  const params = useParams()
  const {user} = useAuth()
  const[emojiPanel, setEmojiPanel] = useState<any>(false)
  const[text, setText] = useState("")
  const[img, setImg] = useState<any>()
  const sendMessage = async () =>{
    if(img){
      sendTextWithImageMessage(text, params, user, img)
      setText("")
      setImg(null)
    } else{
      sendOnlyTextMessage(text, params, user)
      setText("")
    }
  }
  const hidePanel = () =>{
    setEmojiPanel(!emojiPanel)
  }
  return (
    <div className="w-full h-[7%] dark:border-t-[#323657]  border-t border-t-[white] border-l-[white] dark:border-l-[#323657]  border-l bg-[#B5BFC6] dark:bg-[#24273C] flex flex-row justify-between items-center px-[30px] relative">
        <input type="file" style={{display: "none"}} id="file" onChange={(e: any) => {e.target.files[0] !== null ? setImg(e.target.files[0]) : console.log(1)}}/>
        {img ? (<p className="text-[10px] font-[300]">{img?.name}</p>) : (
          <label htmlFor="file">
          <Image src={uploadPhoto} alt="icon" className="w-[40px] cursor-pointer"/>
        </label>
        )}
        <textarea onChange={(e) => setText(e.target.value)} value={text} className="w-full h-full ml-[15px] text-start bg-[#B5BFC6] dark:bg-[#24273C] outline-none text-[15px] font-[200] Manr resize-none placeholder:text-[14px] dark:placeholder:text-[#737482] placeholder:text-[white] px-[10px] pt-[12px]" placeholder="Сообщение..." name="" id="">
        </textarea>
        <EmojiPicker onEmojiClick={(emojiData: any, event: MouseEvent) => {setText((prev: string) => prev + `${emojiData.emoji}`); setEmojiPanel(!emojiPanel)}
          } open={emojiPanel} searchDisabled={true} previewConfig={{showPreview: false}} className="absolute hidden ipadBig:flex left-[00%] top-[-550%] !w-[500px]"/>
        <Image onClick={hidePanel} src={frog} alt="icon" className="size-[30px] cursor-pointer mr-[20px] hidden ipadBig:flex"/>
        <Image onClick={sendMessage} src={message} alt="icon" className="w-[35px] cursor-pointer"/>
    </div>
  )
}

export default InputField

