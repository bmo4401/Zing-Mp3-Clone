'use client';

import usePlayer from '@/hooks/(player)/usePlayer';
import PlayerAction from './(player)/PlayerAction';
import PlayerCard from './(player)/PlayerCard';
import PlayerOptions from './(player)/PlayerOptions';
import Frame from './(player)/Frame';
import useFrame from '@/hooks/(player)/useFrame';
import usePlaylist from '@/hooks/(player)/usePlaylist';
import clsx from 'clsx';
('./(player)/PlayerAction');
const Player = () => {
   const { showPlayer } = usePlayer();
   const { showPlaylist } = usePlaylist();
   return showPlayer ? (
      <>
         <div
            className={clsx(
               'transition-all ease-linear  delay-150 h-20 w-full fixed bottom-0 bg-playerBackground px-4 z-10',
            )}
         >
            {/* Player */}
            <div className=" h-full grid grid-cols-3">
               <PlayerCard />
               <PlayerAction />
               <PlayerOptions />
            </div>
         </div>
         {/* Frame */}
         <Frame />
      </>
   ) : (
      <></>
   );
};

export default Player;
