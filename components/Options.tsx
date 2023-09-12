'use client';

import clsx from 'clsx';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
interface OptionsProps {
  size?: number;
  className?: string;
}
const Options: React.FC<OptionsProps> = ({ size, className }) => {
  return (
    <div
      className={clsx(
        'w-6 h-6 hover:bg-slate-100/40  rounded-full  flex items-center justify-center cursor-pointer',
        className,
      )}
    >
      {' '}
      <BsThreeDots
        size={size ? size : 20}
        className="font-bold"
        title="Options"
      />
    </div>
  );
};
export default Options;
