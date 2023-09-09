import clsx from 'clsx';
import Content from '../(site)/components/Content';
export default function Home() {
  return (
    <main className={clsx('flex-1  flex-col overflow-hidden')}>
      <Content />
    </main>
  );
}
