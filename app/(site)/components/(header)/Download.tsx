'use client';
import { VscDesktopDownload } from 'react-icons/vsc';
const Download = () => {
   return (
      <div className="hidden lg:flex py-[10px] px-5 h-9 justify-items-center bg-search w-[190px] rounded-full gap-1 cursor-not-allowed ">
         <VscDesktopDownload
            size={20}
            className="text-textPrimary"
         />
         <span className="text-textPrimary text-xds font-semibold">
            Tải bản Windows
         </span>
      </div>
   );
};
export default Download;
