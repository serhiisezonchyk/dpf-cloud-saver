import MainWrapper from '@/components/MainWrapper';
import BorderedImage from '@/components/bordered-image/BorderedImage';
import GreetPage from '@/components/main-greet-page/GreetPage';
import Manual from '@/components/manual/Manual';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <MainWrapper className='flex flex-col items-center justify-center text-center bg-background'>
      <GreetPage />
      <BorderedImage
        src='/dashboard-preview.jpg'
        className='w-full sm:w-2/3 p-2 sm:p-4 h-auto mt-4'
      />
      <Manual />
    </MainWrapper>
  );
}
