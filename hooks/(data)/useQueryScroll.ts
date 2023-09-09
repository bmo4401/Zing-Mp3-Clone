'use client';

import getInfiniteSongs, { Slug } from '@/actions/getSongs';
import { useInfiniteQuery } from '@tanstack/react-query';
const LIMIT = 10;
const UseQueryScroll = ({ slug }: { slug: Slug }) => {
  return useInfiniteQuery({
    queryKey: ['songs'],
    queryFn: ({ pageParam }) => getInfiniteSongs({ pageParam, slug }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length === LIMIT ? pages.length + 1 : undefined;
    },
  });
};
export default UseQueryScroll;
