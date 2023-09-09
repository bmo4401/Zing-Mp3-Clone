'use client';

import ListSongs from '@/components/ListSongs';
import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import { ranking } from '@/store/queryKeys';
import { Song } from '@/types';
import { Tab } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { categories } from '../components/(content)/NewRelease';
import LoadingModal from '@/models/(content)/LoadingModal';

const Ranking = () => {
  const active = 'bg-login focus:outline-none';
  const breakpoints = getBreakpoint([1, 1, 2, 2, 3, 3]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Song[]>(ranking.rankings());
  let lists;
  if (data)
    lists = Array.from({ length: 3 }).map((x, idx) =>
      data.slice(idx * 8, idx * 8 + 8),
    );

  return (
    <section className="h-screen bg-content mt-sidebarHeight overflow-hidden ">
      <div className="h-[calc(100vh-90px-90px)] overflow-hidden overflow-y-auto pt-8 pb-10 px-12 ">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-white">Mới Phát Hành</h1>
          <Tab.Group>
            <Tab.List className="w-full flex space-x-2  bg-transparent  text-white">
              <div className="w-full flex justify-between">
                <div className="flex gap-4">
                  {categories.map((category) => {
                    return (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          clsx(
                            `w-20 h-6 flex items-center justify-center border border-slate-100/10 rounded-full font-medium`,
                            selected && active,
                          )
                        }
                      >
                        <span className="uppercase text-xs leading-6">
                          {category}
                        </span>
                      </Tab>
                    );
                  })}
                </div>
              </div>
            </Tab.List>
            <Tab.Panels>
              {lists?.map((list, index) => {
                return (
                  <Tab.Panel
                    key={index}
                    className={clsx('py-4 ')}
                  >
                    <ListSongs
                      data={list}
                      className="w-full"
                    />
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default Ranking;
