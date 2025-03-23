'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';

const Loading = () => {
  return (
    <div className="-py-20 w-full">
      <div className="w-full animate-pulse rounded-md bg-slate-600 py-20" />
    </div>
  );
};

const Gallery = () => {
  const breakpoints = getBreakpoint([1, 2, 2, 3, 3, 3]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const images = ['images/gallery/1.jpg', 'images/gallery/2.jpg', 'images/gallery/3.jpg'];
  const router = useRouter();
  const { setNavigation } = useNavigation();
  if (!item) return <Loading />;
  return (
    <div className={cn('gap-10', className)}>
      {images.slice(0, item).map((image, idx) => (
        <div
          key={idx + Math.random() * 10}
          className="duration-350 cursor-pointer rounded-lg transition-all hover:scale-105 hover:opacity-80"
        >
          <Image
            onClick={() => {
              setNavigation(() => router.push(`album/${idx + 1}`));
            }}
            src={image}
            alt="image"
            width={0}
            height={0}
            className="rounded-lg object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
