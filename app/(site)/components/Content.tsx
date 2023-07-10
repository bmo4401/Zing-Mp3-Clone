'use client';

import clsx from 'clsx';

import NewRelease from './(content)/NewRelease';
import Suggestion from './(content)/Suggestion';

import usePlayer from '@/hooks/(player)/usePlayer';
import useSearch from '@/hooks/(header)/useSearch';
import useSidebar from '@/hooks/(sidebar)/useSidebar';

import { User } from '@prisma/client';
import Gallery from './(content)/Gallery';
import NewRanking from './(content)/NewRanking';
import Partner from './(content)/Partner';
import Radio from './(content)/Radio';
interface ContentProps {
   currentUser: User | undefined;
}
const Content: React.FC<ContentProps> = ({ currentUser }) => {
   const { setShowSearch } = useSearch();
   const { showSidebar } = useSidebar();
   const { showPlayer } = usePlayer();

   return (
      <div
         onClick={() => {
            setShowSearch(false);
         }}
         className={clsx(
            ' bg-content  overflow-hidden ',
            showSidebar
               ? 'pl-sidebarHeight mt-sidebarHeight'
               : 'mt-sidebarHeight',
         )}
      >
         <div
            className={clsx(
               ' pt-8 flex flex-col gap-12 px-12 overflow-x-hidden overflow-y-auto',
               showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
               showPlayer ? 'pb-24' : 'pb-20',
            )}
         >
            <Gallery />
            <Suggestion />
            <NewRelease />
            <NewRanking />

            <Radio />
            <Partner />
         </div>
      </div>
   );
};
export default Content;
