import google from "@/assets/google.svg";
import Image from "next/image";

const GoogleButton = ({handleClick}: any) => {

  return (
    <button onClick={handleClick} className='flex flex-row justify-center items-center bg-[#EE3A57] w-[100%] py-[5px] rounded-[3px] hover:bg-[#c74057]'>
      <p className='text-[16px] !font-[200] mr-[10px]'>
        Быстрый вход с помощью
      </p>
      <Image className='w-[32px] h-[32px]' src={google} alt='google' />
    </button>
  );
};

export default GoogleButton;
