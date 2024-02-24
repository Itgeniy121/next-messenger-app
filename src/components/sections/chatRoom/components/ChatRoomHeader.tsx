import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import settings from "@/assets/settings-svgrepo-com.svg"
import goBack from "@/assets/icons8-назад-50.png"
import avatar from "@/assets/defAvatar.png"
import { useRouter } from "next/navigation"
interface userProps{
    user: any
}
const ChatRoomHeader: FC<userProps> = ({user}) => {
  const router = useRouter()
  const goToProfile = () =>{
    router.push(`/profile/${user[0]?.uid}`)
  }
  return (
    <div className="w-full h-[8%] border-[white] dark:border-b-[#323657] dark:border-l-[#323657] border-b border-l bg-[#B5BFC6] dark:bg-[#24273C] flex flex-row justify-between items-center px-[15px] sidebar:px-[30px]">
        <div className="flex flex-row justify-center items-center">
        <Link href="/"> <Image src={goBack} alt="icon" width={100} height={100} className="w-[30px] mr-[20px] flex sidebar:hidden"/></Link>
        {user && user!== undefined && user[0]?.photoUrl && <Image onClick={goToProfile} src={user[0]?.photoUrl} width={100} height={100} alt="avatar" className="size-[30px] sidebar:size-[45px] rounded-[50%] cursor-pointer"/>}
        {user && user!== undefined && !user[0]?.photoUrl && <Image onClick={goToProfile} src={avatar} width={100} height={100} alt="avatar" className="size-[30px] sidebar:size-[45px] rounded-[50%] cursor-pointer"/>}
        <div className="flex flex-col justify-center items-start h-full ml-[10px]">
            <p className="text-[15px] text-[white] font-[300]">{user && user !== undefined && user[0]?.name}</p>
            <p className="text-[12px] text-[#9495A4] font-[300]">Был(а) в сети недавно.</p>
        </div>
        </div>
        <Image src={settings} alt="settings" className="w-[25px] cursor-pointer"/>
    </div>
  )
}

export default ChatRoomHeader