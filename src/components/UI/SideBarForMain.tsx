import Header from '@/components/UI/Header';
import FooterPanel from '@/components/UI/FooterPanel';
import ChatList from '@/components/UI/ChatList';
const SideBarForMain = ({ user }: any) => {
    return (
        <div className="flex-col bg-[#24273D] w-[320px] h-[100vh] justify-between flex">
            <Header />
            <ChatList user={user} />
            <FooterPanel user={user} />
        </div>
    );
};

export default SideBarForMain;
