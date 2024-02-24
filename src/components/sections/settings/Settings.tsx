import React, { useState, FC, useEffect } from 'react';
import { firestore } from '@/firebase/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import ProfileHeadre from '../profile/components/ProfileHeadre';
import Image from 'next/image';
import { uploadNewAvatar } from '@/utils/userSettings';
import ThemeSwitcher from './components/ThemeSwitcher';
import avatar from '@/assets/defAvatar.png';
interface settingsProps {
    user: any;
}
const Settings: FC<settingsProps> = ({ user }) => {
    const [img, setImg] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState<any>(user?.photoURL);
    useEffect(() => {
        const reference = doc(firestore, `users/${user?.uid}`);
        const result = onSnapshot(reference, (doc) => {
            doc.exists() && setUserPhoto(doc.data().photoUrl);
        });
        return () => {
            result();
        };
    }, []);
    useEffect(() => {
        setIsLoading(true);
        if (img && user) {
            uploadNewAvatar(img, user)
                .finally(() => {
                    setIsLoading(false);
                })
                .catch(() => {
                    alert('Что-то пошло не так');
                    setIsLoading(false);
                });
        }
        setIsLoading(false);
    }, [img]);
    const avatarUpdate = () => {
        let file = document.getElementById('file');
        if (file) {
            file.click();
        }
    };
    return (
        <div className="w-full h-[100vh] flex flex-col justify-start items-center">
            <ProfileHeadre />
            <div className="w-full flex flex-col justify-center items-center mt-[30px]">
                <div
                    className="relative flex cursor-pointer"
                    onClick={avatarUpdate}
                >
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="file"
                        onChange={(e: any) => {
                            e.target.files[0] !== null
                                ? setImg(e.target.files[0])
                                : console.log(1);
                        }}
                    />
                    {isLoading && <span className="loader2"></span>}
                    {!isLoading && userPhoto && (
                        <Image
                            width={100}
                            height={100}
                            src={userPhoto}
                            alt="avatar"
                            className="size-[100px] z-[99999] rounded-[50%] hover:opacity-30"
                        />
                    )}
                    {!isLoading && !userPhoto && (
                        <Image
                            width={100}
                            height={100}
                            src={avatar}
                            alt="avatar"
                            className="size-[100px] z-[99999] rounded-[50%] hover:opacity-30"
                        />
                    )}
                </div>
                <p
                    className="text-[18px] dark:text-[white] text-[#9495A4] nunito font-[300] mt-[15px] hover:underline cursor-pointer"
                    onClick={avatarUpdate}
                >
                    Сменить аватар
                </p>
            </div>
            <ThemeSwitcher />
        </div>
    );
};

export default Settings;
