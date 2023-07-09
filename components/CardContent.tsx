'use client';

import { BtnPlay, Song } from '@/types';
import Card from './Card';
import usePlayer from '@/hooks/(player)/usePlayer';
import { StaticImageData } from 'next/image';
import Artist from './Artist';
import clsx from 'clsx';
interface CardContentProps {
   data: Song | undefined;
   height: string;
   width?: string;
   className?: string;
   classNameTitle?: string;
   play?: boolean;
   disabled?: boolean;
   pass?: boolean;
   isStop?: boolean;
}
const CardContent: React.FC<CardContentProps> = ({
   data,
   height,
   width,
   className,
   classNameTitle,
   play,
   isStop,
   disabled,
   pass,
}) => {
   const {
      showPlayer,
      setShowPlayer,
      setPlaying,
      setPlaylist,
      currentSong,
      isPlaying,
      setContinue,
   } = usePlayer();
   return (
      <div className={clsx('flex gap-2 ', height)}>
         <Card
            onClick={(e) => {
               {
                  e.stopPropagation();

                  !showPlayer && setShowPlayer(true);
                  data?.src === currentSong?.src
                     ? setContinue()
                     : (setPlaying(data, true), data && setPlaylist(data));
               }
            }}
            btnPlay={{
               isPlay: data?.src === currentSong?.src && isPlaying,
               active: data?.src === currentSong?.src,
               size: 20,
               show: play,
            }}
            data={data}
            image={data?.image}
            className={clsx(height, width)}
         />
         <div className={clsx('flex flex-col h-full', className)}>
            <span
               className={clsx(
                  ' text-xds font-bold w-fit whitespace-nowrap text-clip ',
                  !pass ? 'text-white' : 'text-white/50',
                  classNameTitle,
               )}
            >
               {data?.songName}
            </span>
            <div className="flex truncate overflow-hidden md:flex-wrap gap-[1px]  ">
               {data?.singers.map((singer, idx) => (
                  <Artist
                     disabled={disabled}
                     key={singer}
                     singer={
                        idx === data?.singers.length - 1 ? singer : singer + ','
                     }
                  />
               ))}
            </div>
         </div>
      </div>
   );
};
export default CardContent;
