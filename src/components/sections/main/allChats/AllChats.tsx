import React from 'react';
import SideBarForMain from '@/components/UI/SideBarForMain';
const AllChats = ({ user }: any) => {
    return (
        <div className="h-[100vh] w-[100%] sidebar:w-[320px] !flex-row justify-between items-center bg-[#24273D]">
            <SideBarForMain user={user} />
        </div>
    );
};

export default AllChats;
