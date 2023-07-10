'use client';
import usePlayer from '@/hooks/(player)/usePlayer';
import { Song } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CardContent from './CardContent';
import Like from './Like';
import OptionContent from './OptionContent';

interface ListSongsProps {
   data: Song[] | undefined;
   className?: string;
   currentUser?: User | undefined;
   like?: boolean;
}
const ListSongs: React.FC<ListSongsProps> = ({
   data,
   className,
   currentUser,
   like,
}) => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isOpen, setIsOpen] = useState(-1);
   const {
      showPlayer,
      setShowPlayer,
      setPlaying,
      setPlaylist,
      currentSong,
      setContinue,
   } = usePlayer();
   const handleLike = (src: string) => {
      setIsLoading(true);
      axios
         .post('/api/user', {
            userId: currentUser?.id,
            songSrc: src,
            liked: currentUser?.liked,
         })
         .then((res) => {
            router.refresh(), toast.success('Successfully!');
         })
         .catch((err) => {
            console.log(err);
            toast.error('Something went wrong');
         })
         .finally(() => setIsLoading(false));
   };

   return (
      <div
         className={clsx(
            className
               ? className
               : 'w-full lg:w-[calc(100%-256px)] h-screen overflow-hidden overflow-y-auto',
         )}
      >
         <div className="flex flex-col ">
            <div className="text-xx text-contentDesc uppercase font-semibold text-left flex justify-between  lg:px-2 pb-2">
               <span>Bài hát</span>
               <span>Thời gian</span>
            </div>
            <div className="flex flex-col ">
               {data?.map((song, idx) => {
                  return (
                     <div
                        onClick={(e) => (
                           e.stopPropagation(),
                           song?.src === currentSong?.src
                              ? setContinue()
                              : (setPlaying(song), song && setPlaylist(song)),
                           !showPlayer && setShowPlayer(true)
                        )}
                        onMouseEnter={() => setIsOpen(idx)}
                        onMouseLeave={() => setIsOpen(-1)}
                        key={song.songName}
                        className={clsx(
                           'grid grid-cols-4 md:grid-cols-3 border-t rounded-md border-contentDesc/10  px-2 py-2 group hover:bg-sidebarActive cursor-pointer ',
                           song.src === currentSong?.src && 'bg-sidebarActive',
                        )}
                     >
                        <div className="col-span-3 md:col-span-2 overflow-hidden sm:overflow-visible">
                           <CardContent
                              play
                              data={song}
                              width="w-9"
                              height="h-9"
                              nowrap={true}
                           />
                        </div>
                        <div
                           className={clsx(
                              'flex items-center',
                              like ? ' justify-between' : 'justify-end',
                           )}
                        >
                           {like && (
                              <Like
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleLike(song.src);
                                 }}
                                 liked={currentUser?.liked.includes(song.src)}
                                 isLoading={isLoading}
                                 className="w-9 h-9"
                              />
                           )}

                           <div className="flex items-center">
                              {isOpen !== idx && (
                                 <div className="text-contentDesc text-xx font-semibold lg:px-2 flex items-center justify-end ">
                                    {'0' + song.duration}
                                 </div>
                              )}
                              {isOpen === idx && (
                                 <OptionContent
                                    image={song?.image}
                                    like={song?.favorites}
                                    className="w-9 h-9"
                                    size={20}
                                    song={song}
                                 />
                              )}
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};
export default ListSongs;
