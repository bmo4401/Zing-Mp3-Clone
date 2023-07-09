import useUploadModal from '@/hooks/(header)/useUploadModal';
import empty from '@/public/images/empty.png';
import Image from 'next/image';
import { GoUpload } from 'react-icons/go';
const EmptyState = () => {
   const { setShowUploadModal } = useUploadModal();
   return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-start10 ">
         <Image
            src={empty}
            alt="empty"
            width={0}
            height={0}
            className="object-contain  rounded-lg"
         />
         <p className="text-base">Không có bài hát.</p>
         <div className="w-fit px-3 py-2">
            <button
               onClick={() => {
                  setShowUploadModal(true);
               }}
               className="text-white text-center w-full rounded-full bg-fuchsia-600 px-4 py-2 focus:outline-none tracking-wide font-medium hover:opacity-80 flex items-center justify-center "
            >
               <div className="flex items-center justify-center gap-2">
                  <GoUpload size={20} />
                  <span>Upload</span>
               </div>
            </button>
         </div>
      </div>
   );
};
export default EmptyState;
