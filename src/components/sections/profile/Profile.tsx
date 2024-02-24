'use client';
import Image from 'next/image';
import avatar from '@/assets/defAvatar.png';
import { useRouter } from 'next/navigation';
import { FC, useLayoutEffect, useState } from 'react';
import ProfileHeadre from './components/ProfileHeadre';
import { getUserToUid } from '@/utils/getUserInfo';
import { logOut } from '@/utils/firebaseAuth';
interface profileProps {
    params: string;
    user: any;
}
const Profile: FC<profileProps> = ({ params, user }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<any>();
    useLayoutEffect(() => {
        getUserToUid(params).then((val: any) => {
            setCurrentUser(val[0]);
        });
    }, []);
    return (
        <div className="w-full h-[100vh] flex flex-col justify-start items-center">
            <ProfileHeadre />
            <div className="w-full flex flex-col justify-center items-center mt-[30px]">
                {currentUser?.photoUrl ? (
                    <Image
                        width={100}
                        height={100}
                        src={currentUser?.photoUrl}
                        alt="avatar"
                        className="size-[100px] rounded-[50%]"
                    />
                ) : (
                    <Image
                        src={avatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="size-[100px] rounded-[50%]"
                    />
                )}
                <p className="text-[20px] text-[#9495A4] dark:text-[white] nunito font-[300] mt-[15px]">
                    {currentUser?.name}
                </p>
            </div>
            <div className="bg-[#B5BFC6] dark:bg-[#24273C] rounded-[7px] w-[85%] flex flex-col justify-center items-center px-[20px] mt-[30px]">
                <div className="w-full border-b border-[white] dark:border-b-[#323657] py-[10px] flex flex-col justify-start items-start">
                    <p className="text-[#9495A4] text-[13px]">
                        Дата регистрации аккаунта
                    </p>
                    <p className="text-[white] text-[16px] mt-[10px]">
                        {currentUser?.date}
                    </p>
                </div>
                <div className="w-full border-b border-[white] dark:border-b-[#323657] py-[10px] flex flex-col justify-start items-start">
                    <p className="text-[#9495A4] text-[13px]">Почта</p>
                    <p className="text-[white] text-[16px] mt-[10px]">
                        {currentUser?.email}
                    </p>
                </div>
                <div className="w-full py-[10px] flex flex-col justify-start items-start">
                    <p className="text-[#9495A4] text-[13px]">
                        Уникальный номер
                    </p>
                    <p className="text-[white] text-[16px] mt-[10px]">
                        {currentUser?.uid}
                    </p>
                </div>
            </div>
            {user?.uid == params && (
                <button
                    onClick={() => {
                        logOut();
                        router.push('/login');
                    }}
                    className="bg-[#B5BFC6] dark:bg-[#24273C] w-[85%] h-[70px] rounded-[4px] mt-[30px] duration-500 hover:bg-[#c74057]"
                >
                    <p className="text-[17px] Manr font-[300]">
                        Выйти из аккаунта
                    </p>
                </button>
            )}
        </div>
    );
};
export default Profile;
