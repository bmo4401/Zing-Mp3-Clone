'use client';

import Image, { StaticImageData } from 'next/image';
import { IconType } from 'react-icons/lib';
import songPlaceholder from '@/public/images/uploadSong.webp';
import { useState } from 'react';
import clsx from 'clsx';
import Like from './Like';
import Play from './Play';
import Options from './Options';
import usePlayer from '@/hooks/(player)/usePlayer';
import { BtnPlay, Song } from '@/types';
interface ModalProps {
   isOpenModal: boolean;
   setIsOpenModal: (value: boolean) => void;
   like?: boolean;
   play: boolean;
   option?: boolean;
   children?: React.ReactNode;
}
interface CardProps {
   image?: StaticImageData;
   like?: boolean;
   btnPlay: BtnPlay;
   options?: boolean;
   title?: string;
   desc?: string;
   className: string;
   circle?: boolean;
   onClick?: (e: React.SyntheticEvent) => void;
   data?: Song;
   notFit?: boolean;
}
const Card: React.FC<CardProps> = ({
   image,
   like,
   btnPlay,
   options,
   title,
   desc,
   className,
   circle,
   onClick,
   data,
   notFit,
}) => {
   const { isPlaying, currentSong } = usePlayer();
   const [isOpenModal, setIsOpenModal] = useState(false);
   return (
      <div className={clsx(notFit ? '' : 'w-fit')}>
         <div
            onClick={onClick}
            onMouseEnter={() => setIsOpenModal(true)}
            onMouseLeave={() => setIsOpenModal(false)}
            className={clsx(
               ' relative overflow-hidden aspect-square',
               className && className,
               circle ? 'rounded-full' : 'rounded-md ',
            )}
         >
            <Image
               alt="Image"
               src={image || songPlaceholder}
               width={0}
               height={0}
               sizes="100vw"
               style={{ width: '100%', height: 'auto' }}
               className={clsx(
                  ` aspect-square object-cover  transition-all duration-700 h`,
                  (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
                     btnPlay?.show &&
                     'outline-none',
                  (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
                     btnPlay?.show &&
                     'scale-110',
                  (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
                     btnPlay?.show &&
                     'opacity-80',
                  circle ? 'rounded-full' : 'rounded-md ',
               )}
            />
            {(isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
               btnPlay?.show && (
                  <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-100 text-white">
                     <Play btnPlay={btnPlay} />
                     {options && <Options />}
                  </div>
               )}
         </div>
         <div>
            <h2 className={clsx('text-sm font-bold w-fit text-white mt-2')}>
               {title && title}
            </h2>
            <span className={clsx('text-xs text-contentDesc')}>
               {desc && desc}
            </span>
         </div>
      </div>
   );
};

export default Card;
