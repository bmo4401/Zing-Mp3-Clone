import { getSinger } from '@/actions/getSinger';
import { artist } from '@/store/queryKeys';
import { Song } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
/* React-query */

const useSinger = (name: string) => {
  const queryClient = useQueryClient();

  return useQuery<Song[]>({
    queryKey: artist.artist(name),
    queryFn: () => getSinger(name),

    onSuccess: (data) => {
      queryClient.setQueryData([artist.artist(name)], (prev: Song[] | undefined) => prev);
    }
  });
};
export default useSinger;
