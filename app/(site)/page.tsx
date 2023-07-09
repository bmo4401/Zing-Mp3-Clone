import clsx from 'clsx';
import Content from '../(site)/components/Content';
import getCurrentUser from '@/actions/getCurrentUser';
import { User } from '@prisma/client';
import useSearch from '@/hooks/(header)/useSearch';
export default async function Home() {
   const currentUser = (await getCurrentUser()) as User;

   return (
      <main className={clsx('flex-1  flex-col overflow-hidden')}>
         <Content currentUser={currentUser} />
      </main>
   );
}
