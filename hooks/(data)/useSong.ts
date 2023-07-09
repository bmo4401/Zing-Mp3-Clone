import { getSongsByType } from '@/actions/getSongs';
import { Song } from '@/types';
import { useQuery } from '@tanstack/react-query';

/* React-query */

const useSong = (key: any, type: string, limit?: number) => {
   return useQuery<Song[] | string>({
      //@ts-ignore
      queryKey: key(),
      queryFn: async () => await getSongsByType(type, limit),
   });
};

export default useSong;
