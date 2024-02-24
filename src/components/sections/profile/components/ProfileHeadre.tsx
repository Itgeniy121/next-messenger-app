import goToBack from '@/assets/icons8-назад-50.png';
import Image from 'next/image';
import Link from 'next/link';
const ProfileHeadre = () => {
    return (
        <div className="w-full dark:border-b-[#323657] border-b-[white] border-l-[white] dark:border-l-[#323657] border-b border-l flex flex-row justify-start items-center h-[8%] px-[20px] bg-[#B5BFC6] dark:bg-[#24273C]">
            <Link
                href="/"
                className="flex flex-row justify-center items-center"
            >
                <Image src={goToBack} alt="back" className="size-[30px]" />
                <p className="text-[15px] font-[300] dark:text-[#9495A4] text-[white]">
                    На главную
                </p>
            </Link>
        </div>
    );
};

export default ProfileHeadre;
