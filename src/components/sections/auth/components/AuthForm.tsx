"use client"
import { uploadProfilePhoto } from "@/utils/firebaseStorage";
import { useState } from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import Link from "next/link";
import Image from "next/image";
import {createNewUser} from "@/utils/firebaseAuth"
import { useRouter } from "next/navigation";
import upload from "@/assets/upload.png"
type authTypes = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  check: boolean,
}
const AuthForm = () => {
  const[img, setImg] = useState<any>()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<authTypes>()
  const router = useRouter()

  const onSubmit: SubmitHandler<authTypes> = async (data, e) =>{
    const photoURL = e?.target[5].files[0]
    setLoading(true)
    if(password === confirmPassword){
      await createNewUser(email, password, name).then(async (user: any)=>{
        if(user !== undefined && photoURL){
          await uploadProfilePhoto(photoURL, name, user.uid).then(async ()=>{
            await setTimeout(()=>{
              router.push("/")
            },1500)
          }).finally(()=>{
            setTimeout(()=>{
              reset()
              setLoading(false)
            },1500)
          })
        }
        else{
          console.log(user)
          await setTimeout(()=>{
            router.push("/")
            reset()
            setLoading(false)
          },1500)
        }
        })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-start w-full mt-[20px]">
      <div className="w-full">
        <label className="text-[12px] text-[#9495A4] ml-[15px]">Ваше имя</label>
        <input
        type='text'
        {...register("name", {
          required: "Введите ваше имя",
          minLength: {
            value: 4,
            message: "Имя должно состоять более чем из 3 букв",
          },
        })}
        onChange={e => setName(e.target.value)} 
        maxLength={20}
        placeholder="Алексей" 
        className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"/>
        {errors?.name && <div className='text-[red] text-[11px] ml-[20px]'>{errors.name.message}</div>}
      </div>
      <div className="w-full mt-[10px]">
        <label className="text-[12px] text-[#9495A4] ml-[15px]">Ваш email</label>
        <input
        type='email'
        {...register("email", {
          required: "Введите Email",
          pattern: {
            value:
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            message: "Введите корректный Email",
          },
        })}
        onChange={e => setEmail(e.target.value)} 
        maxLength={30}
        placeholder="📧  example@gmail.com" 
        className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"/>
        {errors?.email && <div className='text-[red] text-[11px] ml-[20px]'>{errors.email.message}</div>}
      </div>
      <div className="w-full mt-[10px]">
        <label className="text-[12px] text-[#9495A4] ml-[15px]">Ваш пароль</label>
        <input 
        type="password" 
        maxLength={30}
        {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 5,
              message: "Пароль должен содержать больше 4 символов",
            },
          })}
          onChange={e => setPassword(e.target.value)} placeholder="🔒  *******" className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"/>
        {errors?.password && (<div className='text-[red] text-[11px] ml-[20px]'>{errors.password.message}</div>)}
      </div>
      <div className="w-full mt-[10px]">
        <label className="text-[12px] text-[#9495A4] ml-[15px]">Подтвердите пароль</label>
        <input 
          maxLength={30}
        type="password" 
        {...register('confirmPassword', {
          required: "Введите пароль повторно",
        })}
        onChange={e => setConfirmPassword(e.target.value)} placeholder="🔒  *******" className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"/>
        {errors?.confirmPassword && (<div className='text-[red] text-[11px] ml-[20px]'>{errors.confirmPassword?.message}</div>)}
        {(!errors?.confirmPassword && confirmPassword !== "" && confirmPassword !== password) && (<div className='text-[red] text-[11px] ml-[20px]'>Пароли не совпадают</div>)}
      </div>
      <div>
      <div className="flex flex-col mt-[15px]">
        <div className="flex flex-row">
        <input 
        type="checkbox"
        {...register("check", {
          required: "Поставь галку!"
        })}
        />
        &nbsp;&nbsp;
        <p className="text-[12px] text-[#9495A4] font-[200] extramin:text-[15px]">Это мессенджер для панков, тут правил нет!</p>
        </div>
        {errors?.check && (<div className='text-[red] text-[11px] ml-[20px]'>{errors.check?.message}</div>)}
      </div>
      <input style={{ display: "none" }} type="file" id="file" onChange={(e: any) => {e.target.files[0] !== null ? setImg(e.target.files[0]) : console.log(1)}}/>
          {img ? (<p className="text-[15px] font-[200]">{img.name}</p>) : (
            <label className="flex flex-row justify-start items-center w-[200px] mt-[20px] cursor-pointer" htmlFor="file">
            <Image src={upload} alt="" className="w-[30px] h-[30px] mr-[10px]"/>
            <p className="text-[15px] font-[200]">Загрузить аватар</p>
          </label>
          )}
      </div>
      <button className='flex flex-row justify-center items-center bg-[#EE3A57] w-[100%] py-[12px] rounded-[3px] mt-[15px] hover:bg-[#c74057]'>
      <p className='text-[16px] !font-[200] mr-[10px]'>
        Создать
      </p>
    </button>
    <div className="flex flex-row mt-[10px]">
      <p className="text-[15px] text-[#9495A4] font-[200]">Есть аккаунт?</p>
      &nbsp;&nbsp;&nbsp;
      <Link href="/login" className="text-[15px] text-[#EE3A57] font-[300] hover:underline">Войти</Link>
    </div>
    {loading && <span className="loader mt-[25px]"></span>}
    </form>
  )
}

export default AuthForm