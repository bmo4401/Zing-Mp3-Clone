//@ts-nocheck
'use client';
import { text } from '@/app/(site)/components/(header)/ActiveAvatar';
import getPosition from '@/helpers/getPosition';
import usePlayer from '@/hooks/(player)/usePlayer';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import bmw from '/public/bmw.jpg';
import { Song } from '@/types';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { BsDownload, BsMic } from 'react-icons/bs';
import { RiLinksLine, RiPlayListAddLine, RiPlayListFill } from 'react-icons/ri';
import { SlEarphones } from 'react-icons/sl';
import { toast } from 'react-toastify';
import SongDetailModal from './SongDetailModal';
import CopyToClipboard from 'react-copy-to-clipboard';
interface PositionProps {
  height: number;
  width: number;
}
interface RankingModalProps {
  children: React.ReactNode;
  image?: StaticImageData;
  like?: string | number;
  song?: Song;
}

interface OptionsProps {
  icon: IconType;
  label: string;
  action?: (song: Song, currentSong?: Song) => void;
  copy?: boolean;
}

function RankingModal({ children, image, like, song }: RankingModalProps) {
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0
  });
  const className = getPosition(position);
  const { setPlayNext, setPlaylist, setPlaying, setContinue, currentSong } = usePlayer();
  const options: OptionsProps[] = getOptions({
    setPlayNext,
    setPlaylist,
    setPlaying,
    setContinue
  });
  const ref = useRef();
  return (
    /* Z-index */
    <Popover className="relative z-30 w-fit focus:outline-none">
      {({ open, close }) => (
        <div className="relative z-20 w-fit">
          <Popover.Button
            onMouseEnter={(e) => {
              const width = (e.clientX * 100) / size.width;
              const height = (e.clientY * 100) / size.height;
              setPosition({ width, height });
            }}
            className="relative w-fit hover:underline hover:opacity-80 focus:outline-none"
          >
            {children}
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-50 "
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 "
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={cn('absolute z-30 w-64 rounded-md bg-searchFocus', className)}
              onMouseLeave={() => close()}
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {/* Image */}
                  <SongDetailModal>
                    <div className="flex gap-2 p-3">
                      <div className="h-9 w-9 rounded-lg">
                        <Image
                          alt="Avatar"
                          width={0}
                          height={0}
                          sizes="100vw"
                          src={image || bmw}
                          className="h-9 w-9 rounded-lg object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-1">
                        <h2 className="cursor-pointer overflow-hidden whitespace-nowrap text-xds font-medium text-white hover:text-login">
                          {song?.songName}
                        </h2>
                        <div className="flex gap-3 text-xx text-contentDesc">
                          <div className="flex gap-1">
                            <div>
                              {' '}
                              <AiOutlineHeart size={16} />
                            </div>
                            <div className="text-end">{like && like} Likes</div>
                          </div>
                          <div className="flex gap-1">
                            <div>
                              {' '}
                              <SlEarphones size={14} />
                            </div>
                            <div className="text-end">{like && like} Views</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SongDetailModal>
                  {/* Action */}
                  <div className="px-3">
                    <div className="rounded-lg bg-settingsFocus">
                      <div className="grid grid-cols-3">
                        <Link
                          href={song?.src as string}
                          target="_blank"
                          className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 text-white opacity-100 hover:bg-contentFocus hover:opacity-90"
                        >
                          <div>
                            <BsDownload size={18} />
                          </div>
                          <span className="text-xxx">Tải xuống</span>
                        </Link>
                        <div
                          onClick={() => toast.warning(text)}
                          className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg p-2 text-white opacity-100 hover:bg-contentFocus hover:opacity-90"
                        >
                          <div>
                            <BsMic size={18} />
                          </div>
                          <span className="text-xxx">Lời bài hát</span>
                        </div>
                        <div
                          onClick={() => toast.warning(text)}
                          className="flex cursor-not-allowed flex-col items-center justify-center rounded-lg p-2 text-white opacity-100 hover:bg-contentFocus hover:opacity-90"
                        >
                          <div>
                            <BiBlock size={18} />
                          </div>
                          <span className="text-xxx">Chặn</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Options */}
                  <div className="flex flex-col items-start text-searchText">
                    {options.map((option) =>
                      option.copy ? (
                        <CopyToClipboard
                          key={option.label}
                          text={currentSong?.src || "This song doesn't existing"}
                          onCopy={() => {
                            toast.success('Copied');
                            close();
                          }}
                        >
                          <button className='className="flex " w-full items-center justify-between px-3 py-2 hover:bg-contentFocus'>
                            <div className="flex items-center gap-2">
                              <div>
                                <option.icon size={16} />
                              </div>
                              <span className="text-xds">{option.label}</span>
                            </div>
                          </button>
                        </CopyToClipboard>
                      ) : (
                        <div
                          key={option.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            option?.action && option?.action(song as Song, currentSong as Song);
                            close();
                          }}
                          className="flex w-full cursor-pointer items-center justify-between px-3 py-2 hover:bg-contentFocus"
                        >
                          <div className="flex items-center gap-2">
                            <div>
                              <option.icon size={16} />
                            </div>
                            <span className="text-xds">{option.label}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-center pb-2 pt-1 text-xds font-medium text-contentDesc">
                  Cung cấp bởi FUGA
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}
interface getOptionsProps {
  setPlayNext?: (song: Song) => void;
  setPlaylist: (song: Song) => void;
  setPlaying: (song: Song) => void;
  setContinue: () => void;
}
const getOptions = ({ setPlaylist, setPlayNext, setPlaying, setContinue }: getOptionsProps) => [
  {
    icon: AiOutlineHeart,
    label: 'Trình phát nhạc',
    action: (song?: Song, currentSong?: Song) =>
      song?.src === currentSong?.src
        ? setContinue()
        : (setPlaying(song as Song), song && setPlaylist(song))
  },
  {
    icon: RiPlayListAddLine,
    label: 'Thêm vào danh sách phát',
    action: setPlaylist
  },
  {
    icon: RiPlayListFill,
    label: 'Phát tiếp theo',
    action: setPlayNext
  },

  {
    icon: RiLinksLine,
    label: 'Sao chép link',
    copy: true
  }
];

export default RankingModal;
