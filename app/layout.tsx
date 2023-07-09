import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastifyProvider from '@/providers/ToastifyProvider';
import Sidebar from '@/app/(site)/components/Sidebar';
import Header from './(site)/components/Header';
import Player from './(site)/components/Player';
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '@/models/(header)/LoginModal';
import UploadModal from '@/models/(header)/UploadModal';
import getCurrentUser from '@/actions/getCurrentUser';
import { User } from '@prisma/client';
const font = Inter({ subsets: ['latin'] });

export const metadata = {
   title: 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV',
   description:
      'Dịch vụ nhạc số với hàng triệu bài hát và MV có bản quyền chất lượng cao, giúp bạn nghe nhạc, tải nhạc, upload và đồng bộ kho nhạc của tôi trên nhiều thiết bị.',
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const currentUser = (await getCurrentUser()) as User;
   return (
      <html lang="en">
         <body className={font.className}>
            <ReactQueryProvider>
               <ToastifyProvider />
               <LoginModal />
               <UploadModal />
               <Header currentUser={currentUser} />
               <Sidebar currentUser={currentUser}>{children}</Sidebar>
               <Player />
            </ReactQueryProvider>
         </body>
      </html>
   );
}
