'use client';
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase.config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logOut } from '@/utils/firebaseAuth';
import settings from '@/assets/settings.svg';
import defAvatar from '@/assets/defAvatar.png';
import chats from '@/assets/chatsIcon.png';
import exitDoor from '@/assets/exitDoor.png';
const FootePanel = ({ user }: any) => {
    const router = useRouter();
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
    const signOutFromAccount = () => {
        logOut();
        router.push('/login');
    };
    const goToProfile = () => {
        router.push(`/profile/${user?.uid}`);
    };
    const goToMain = () => {
        router.push('/');
    };
    const goToSettings = () => {
        router.push('/settings');
    };
    return (
        <div className="flex flex-row w-full items-center justify-between h-[7%] border-t px-[5px] bg-[#B5BFC6] dark:bg-[#24273D] border-[white] dark:border-[#323657]">
            {userPhoto && (
                <img
                    onClick={goToProfile}
                    src={userPhoto}
                    className="w-[40px] h-[40px] rounded-[20px] cursor-pointer"
                />
            )}
            {!user?.photoURL && (
                <Image
                    onClick={goToProfile}
                    alt=""
                    src={defAvatar}
                    className="w-[40px] h-[40px] rounded-[20px] cursor-pointer"
                />
            )}
            <Image
                onClick={goToMain}
                className="w-[40px] h-[40px] cursor-pointer"
                src={chats}
                alt="icon"
            />
            <Image
                onClick={goToSettings}
                className="w-[40px] h-[40px] cursor-pointer"
                src={settings}
                alt="icon"
            />
            <Image
                onClick={signOutFromAccount}
                className="w-[40px] h-[40px] cursor-pointer"
                src={exitDoor}
                alt="icon"
            />
        </div>
    );
};

export default FootePanel;
