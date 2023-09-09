'use client';

import clsx from 'clsx';

import NewRelease from './(content)/NewRelease';
import Suggestion from './(content)/Suggestion';

import useSearch from '@/hooks/(header)/useSearch';
import usePlayer from '@/hooks/(player)/usePlayer';
import useSidebar from '@/hooks/(sidebar)/useSidebar';

import Gallery from './(content)/Gallery';
import NewRanking from './(content)/NewRanking';
import Partner from './(content)/Partner';
import Radio from './(content)/Radio';

const Content = () => {
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
        showSidebar ? 'pl-sidebarHeight mt-sidebarHeight' : 'mt-sidebarHeight',
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
