'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Box from './(sidebar)/Box';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useRoutes from '@/hooks/(sidebar)/useRoutes';
import useSidebar from '@/hooks/(sidebar)/useSidebar';
import usePlayer from '@/hooks/(player)/usePlayer';
import getBreakpoint from '@/helpers/getBreakpoint';
import MobileLogo from '@/public/images/sidebar/logo_mobile.svg';
import Logo from '@/public/images/sidebar/logo.svg';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { User } from '@prisma/client';
import { BsChevronLeft } from 'react-icons/bs';
import { useState } from 'react';
interface SidebarProps {
   children: React.ReactNode;
   currentUser: User | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, children }) => {
   const router = useRouter();
   const routes = useRoutes();
   const { showSidebar, setShowSidebar } = useSidebar();
   const breakpoints = getBreakpoint([1, 1, 1, 2, 2, 2]);
   const item = useBreakpoint(breakpoints);
   const dataHome = routes.slice(0, 4);
   const dataRankings = routes.slice(4, 6);
   const dataPrivate = routes.slice(6, 7);
   const dataPlaylists = routes.slice(7, 8);
   const condition = (
      classNameTrue: string | StaticImageData,
      classNameFalse: string | StaticImageData,
   ) => {
      if (item === 2) {
         return classNameTrue;
      } else {
         if (showSidebar) {
            return classNameTrue;
         }
         return classNameFalse;
      }
   };
   const [show, setShow] = useState<boolean>(false);
   const { setNavigation } = useNavigation();
   const { showPlayer } = usePlayer();
   return (
      <section className={clsx(' flex overflow-hidden', 'h-screen')}>
         <>
            <div
               onClick={() => router.push('/', { shallow: true })}
               className="fixed z-10 top-0 translate-x-1/4 translate-y-1/4  sm:hidden  bg-sidebarActive rounded-full  cursor-pointer opacity-100 hover:opacity-70  flex items-center justify-center"
            >
               <Image
                  alt="Logo"
                  src={condition(Logo, MobileLogo) || ''}
                  className={clsx(
                     condition('', 'aspect-square'),
                     condition('w-28', 'w-10'),
                     condition('h-11', 'h-10'),
                  )}
               />
            </div>
            <div
               className={clsx(
                  ' sm:block overflow-hidden lg:w-54',
                  show || showSidebar ? 'w-54' : 'w-sidebarHeight ',
                  show || showSidebar ? 'fixed left-0 z-40' : '',
                  show || showSidebar
                     ? 'transition-all ease-linear  delay-150'
                     : '',
                  showPlayer ? 'h-[calc(100vh-90px)]' : 'h-screen',
                  !show && 'hidden',
               )}
            >
               <div
                  className={clsx(
                     ' lg:w-54 bg-sidebarBackground flex flex-col',
                     showSidebar ? 'w-54' : 'w-sidebarHeight ',
                     showPlayer
                        ? 'h-[calc(100vh-144px)]'
                        : 'h-[calc(100vh-54px)]',
                  )}
               >
                  <div
                     onClick={() => (
                        setNavigation(() =>
                           router.push('/', { shallow: true }),
                        ),
                        show && setShow(false)
                     )}
                     className={clsx(
                        ' hover:opacity-90  h-sidebarHeight cursor-pointer',
                        condition('pl-[25px] pr-[25px]', ''),
                     )}
                  >
                     <div
                        className={clsx(
                           'w-full h-sidebarHeight flex items-center ',
                           condition('', 'justify-center'),
                        )}
                     >
                        <Image
                           alt="Logo"
                           src={condition(Logo, MobileLogo) || ''}
                           className={clsx(
                              condition('', 'aspect-square'),
                              condition('w-28', 'w-10'),
                              condition('h-11', 'h-10'),
                           )}
                        />
                     </div>
                  </div>
                  <Box
                     data={dataHome}
                     item={item}
                  />
                  <div className="relative mt-[14px] ml-[21px] mr-[25px] ">
                     <div className="absolute -top-px  h-px w-full bg-sidebarActive" />
                     <div className="absolute top-0 h-[14px] w-full z-10 bg-sidebarBackground" />
                     <div className="absolute w-full h-[10px] top-[14px] shadow-lg shadow-slate-900" />
                  </div>

                  <div
                     onClick={() => show && setShow(false)}
                     className="relative pt-[14px] overflow-hidden hover:overflow-y-auto"
                  >
                     <Box
                        data={dataRankings}
                        item={item}
                     />
                     {currentUser && (
                        <Box
                           data={dataPrivate}
                           item={item}
                        />
                     )}
                  </div>
               </div>
               <div
                  className={clsx('hidden sm:block h-px bg-sidebarActive ')}
               />

               <div
                  className={clsx(
                     'h-[54px]   bg-sidebarBackground flex items-center justify-between',
                     show ? 'w-sidebarHeight' : 'w-sidebarWidth',
                  )}
               >
                  <Box
                     data={dataPlaylists}
                     item={item}
                  />
               </div>
            </div>
            {/* /// Layout */}
            <div
               onClick={() => setShow(false)}
               className={clsx(
                  'inset-0 bg-black bg-opacity-25 z-30',
                  show ? 'fixed' : 'hidden',
               )}
            ></div>
            <div
               onClick={() => setShow(true)}
               className="fixed z-10 bottom-0 -translate-y-20 sm:hidden w-9 h-9 bg-sidebarActive rounded-full  cursor-pointer opacity-70 hover:opacity-100 font-semibold flex items-center justify-center"
            >
               <BsChevronLeft size={20} />
            </div>
         </>
         <main className="flex-1 bg-content overflow-hidden">{children}</main>
      </section>
   );
};
export default Sidebar;
