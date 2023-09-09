'use client';

import { Slug } from '@/actions/getSongs';
import InfinitePage from '@/components/InfinitePage';
import UseQueryScroll from '@/hooks/(data)/useQueryScroll';
import usePlayer from '@/hooks/(player)/usePlayer';
import { Song } from '@/types';
import clsx from 'clsx';
import { ElementRef, useRef } from 'react';
const slugs: Slug[] = ['/trending', '/favorite', '/new-music', '/top-views'];
const ZingChart = () => {
  const { showPlayer } = usePlayer();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    UseQueryScroll({
      slug: slugs[0],
    });
  const root = useRef<ElementRef<'div'>>(null);

  return (
    <section className="h-screen bg-content mt-sidebarHeight overflow-hidden ">
      <div
        ref={root}
        className={clsx(
          'relative pt-8  lg:flex gap-10  px-12 overflow-hidden overflow-y-auto',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20',
        )}
      >
        <InfinitePage
          data={data?.pages as Song[][]}
          fetchNextPage={fetchNextPage}
          root={root}
        />
        {isFetchingNextPage && (
          <div className="absolute bottom-0 w-full flex justify-center text-white text-xds">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
};

export default ZingChart;
