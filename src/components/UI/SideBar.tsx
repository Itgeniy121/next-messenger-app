import Header from '@/components/UI/Header';
import FooterPanel from '@/components/UI/FooterPanel';
import ChatList from '@/components/UI/ChatList';
const SideBar = ({ user }: any) => {
    return (
        <div className="flex-col w-[320px] h-[100vh] justify-between hidden sidebar:flex">
            <Header />
            <ChatList user={user} />
            <FooterPanel user={user} />
        </div>
    );
};

export default SideBar;
