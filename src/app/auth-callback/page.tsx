'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      console.log('first');
      if (success) {
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
    onError: (err) => {
      console.log('err');
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in');
      }
    },
    retry: 5,
    retryDelay: 500,
    
  });
  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-[25px] w-[25px] animate-spin text-primary' />
      </div>
    </div>
  );
};

export default AuthCallback;
