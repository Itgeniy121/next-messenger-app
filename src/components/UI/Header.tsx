'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/utils/getUserInfo';
import { useRouter } from 'next/navigation';
import { createChatRoom } from '@/utils/userChatting';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import avatar from '@/assets/defAvatar.png';
const Header = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<any>();
    const [filtredUsers, setFiltredUsers] = useState<any>();
    const debounced = useDebounce(search);
    useEffect(() => {
        getAllUsers().then((users: any) => {
            setUsers(users);
        });
    }, []);
    useEffect(() => {
        const filteredUsersByName = users?.filter((user: any) =>
            user.name.toLowerCase().includes(search.toLowerCase()),
        );
        setFiltredUsers(filteredUsersByName);
    }, [search]);
    const goToPersonalChat = (users: any) => {
        if (user.uid !== users.uid) {
            createChatRoom(users, user)
                .then((val: any) => {
                    router.push(`/personalChat/${val}`);
                })
                .catch(() => alert('Что-то пошло не так('));
        } else {
            router.push('/');
        }
    };
    return (
        <div className="flex relative flex-col w-[320px] items-center justify-start h-[15%] border-b bg-[#B5BFC6] dark:bg-[#24273D] dark:border-[#323657] border-[white]">
            <p className="Manr mt-[15px]">Чаты</p>
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="dark:bg-[#1c1e33] bg-[#6E7F8D] w-[250px] h-[30px] rounded-[5px] outline-none font-[300] text-[13.5px] px-[10px] mt-[20px] text-center"
                placeholder="🔍 Поиск..."
            />
            {debounced !== '' && (
                <div className="absolute flex flex-col justify-start items-start bg-[#1c1e33] border-[2px] border-[#323657] h-[300px] w-full bottom-[-300px] overflow-y-auto">
                    {filtredUsers &&
                        filtredUsers.map((users: any) => (
                            <div
                                onClick={() => goToPersonalChat(users)}
                                key={users.uid}
                                className="w-full cursor-pointer bg-[#B5BFC6] hover:bg-[#acbecb] dark:hover:bg-[#252844] dark:bg-[#24273D] duration-200 h-[70px] border-b dark:border-[#323657] border-[white] flex flex-row justify-start items-center pl-[25px] z-[999]"
                            >
                                {users.photoUrl ? (
                                    <Image
                                        src={users.photoUrl}
                                        alt="avatar"
                                        className="size-[50px] mr-[15px] rounded-[50%]"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <Image
                                        src={avatar}
                                        alt="avatar"
                                        className="size-[50px] mr-[15px] rounded-[50%]"
                                        width={100}
                                        height={100}
                                    />
                                )}
                                <p className="text-[15px]">{users.name}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Header;
