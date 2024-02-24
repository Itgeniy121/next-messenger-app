'use client';
import { auth } from '@/firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithGoogle } from '@/utils/firebaseAuth';
import { useRouter } from 'next/navigation';
import GoogleButton from '../../UI/GoogleButton';
import LoginForm from './components/LoginForm';
const Login = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const goLogin = () => {
        if (user) {
            router.push('/');
        } else {
            signInWithGoogle()
                .then((val) => {
                    if (val) {
                        router.push('/');
                    }
                })
                .catch((val) => {});
        }
    };
    return (
        <div className="dark:bg-[#25273E] bg-[#B5BFC6] px-[20px] py-[20px] flex flex-col justify-start items-center rounded-[5px] w-full h-[100vh] bM:w-[400px] bM:h-[570px]">
            <h1 className="Manr text-[20px] mb-[20px]">Привет 🤟</h1>
            <GoogleButton handleClick={goLogin} />
            <h1 className="Manr text-[15px] my-[15px]">или</h1>
            <div className="border-[#9495A4] border-b w-[100%]"></div>
            <LoginForm />
        </div>
    );
};

export default Login;
