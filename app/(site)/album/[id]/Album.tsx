'use client';

import Artist from '@/components/Artist';
import Card from '@/components/Card';
import Like from '@/components/Like';
import Options from '@/components/Options';
import Play from '@/components/Play';
import { favorite } from '@/store/queryKeys';
import { List } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import AlbumCard from './AlbumCard';
import ListSongs from '@/components/ListSongs';
import usePlayer from '@/hooks/(player)/usePlayer';
import LoadingModal from '@/models/(content)/LoadingModal';
import { cn } from '@/libs/utils';
interface AlbumProps {
  params: string;
}
const Album: React.FC<AlbumProps> = ({ params }) => {
  const { showPlayer } = usePlayer();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<List>(favorite.favorite(+params));

  return (
    <>
      {!data && <LoadingModal />}
      <section className="h-screen bg-content mt-sidebarHeight overflow-hidden ">
        <div
          className={cn(
            'pt-8  lg:flex gap-10  px-12 overflow-hidden overflow-y-auto',
            showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
            showPlayer ? 'pb-24' : 'pb-20',
          )}
        >
          <AlbumCard
            thumbnails={data?.thumbnails}
            active={data?.data.includes(data?.thumbnails?.song)}
          />
          <ListSongs
            data={data?.data}
            className="w-full h-fit"
          />
        </div>
      </section>
    </>
  );
};

export default Album;
