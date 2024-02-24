import React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInUser } from '@/utils/firebaseAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
type loginTypes = {
    email: string;
    password: string;
};
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<loginTypes>();
    const router = useRouter();
    const onSubmit: SubmitHandler<loginTypes> = async (data, e) => {
        setLoading(true);
        await signInUser(email, password);
        if (localStorage.getItem('logged')) {
            router.push('/');
            setLoading(false);
            reset();
        }
        setLoading(false);
        reset();
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-start w-full mt-[40px]"
        >
            <div className="w-full">
                <label className="text-[12px] text-[#9495A4] ml-[15px]">
                    Ваш email
                </label>
                <input
                    maxLength={30}
                    type="email"
                    {...register('email', {
                        required: 'Введите Email',
                        pattern: {
                            value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                            message: 'Введите корректный Email',
                        },
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="📧  example@gmail.com"
                    className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"
                />
                {errors?.email && (
                    <div className="text-[red] text-[11px] ml-[20px]">
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div className="w-full mt-[25px]">
                <label className="text-[12px] text-[#9495A4] ml-[15px]">
                    Ваш пароль
                </label>
                <input
                    maxLength={30}
                    type="password"
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                            value: 5,
                            message: 'Пароль должен содержать более 4 символов',
                        },
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="🔒  *******"
                    className="w-full h-[50px] border-[2px] rounded-[28px] outline-none px-[15px] text-[#9495A4] text-[15px] !font-[200] border-[white] dark:border-[#6e284b] bg-[#E4EBF1] dark:bg-[#25273E]"
                />
                {errors?.password && (
                    <div className="text-[red] text-[11px] ml-[20px]">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <button className="flex flex-row justify-center items-center bg-[#EE3A57] w-[100%] py-[12px] rounded-[3px] mt-[25px] hover:bg-[#c74057]">
                <p className="text-[16px] !font-[200] mr-[10px]">Войти</p>
            </button>
            <div className="flex flex-row mt-[15px]">
                <p className="text-[15px] text-[#9495A4] font-[200]">
                    Еще нет аккаунта?
                </p>
                &nbsp;&nbsp;&nbsp;
                <Link
                    href="/auth"
                    className="text-[15px] text-[#EE3A57] font-[300] hover:underline"
                >
                    Создать
                </Link>
            </div>
            {loading && <span className="loader mt-[25px]"></span>}
        </form>
    );
};

export default LoginForm;
