'use client';
import { getInterlocutorUid } from '@/utils/getInterlocutorUid';
import { deleteChatRoom } from '@/utils/userChatting';
import { useParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const ModalWindow = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const closeModal = () => {
    document.getElementById('modal')?.classList.remove('active');
  };
  const deleteChat = () => {
    const interlocutorUid = getInterlocutorUid(params?.chatId, user.uid);
    deleteChatRoom(interlocutorUid, user.uid, params.chatId)
      .then(() => {
        router.push('/');
        toast.success('Переписка удалена', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch(() => {});
  };
  return (
    <div
      onClick={closeModal}
      id="modal"
      className="top-0 bottom-0 right-0 left-0 fixed hidden authModal justify-center items-center z-[900]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] ipad:w-[550px] flex justify-start items-center flex-col h-[220px] rounded-[10px] z-[99999] bg-[#B5BFC6] py-[20px] ipad:py-[35px] px-[10px] ipad:px-[30px] dark:bg-[#24273C]"
      >
        <h1 className="text-[15px] ipad:text-[18px] Marn text-[white] font-[400] text-center">
          Вы действительно хотите удалить переписку?
        </h1>
        <p className="text-[#9495A4] text-[12px] ipad:text-[14px] text-center font-[300] nunito mt-[20px]">
          Все сообщения будут невозвратно удалены как у вас, так и у вашего собседеника!
        </p>
        <div className="flex flex-row w-[100%] justify-between items-center mt-[40px]">
          <button
            onClick={deleteChat}
            className="w-[120px] ipad:w-[170px] text-[14px] h-[50px] rounded-[5px] bg-[#923636] hover:bg-[#b93a3a] duration-300"
          >
            Да
          </button>
          <button
            onClick={closeModal}
            className="w-[120px] ipad:w-[170px] text-[15px] h-[50px] rounded-[5px] bg-[#696fa9] hover:bg-[#31355d] duration-300"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
