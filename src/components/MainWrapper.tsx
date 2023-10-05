import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const MainWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl min-h-screen h-full px-[10px] md:px-80px pt-[100px] sm:pb-[184px]', className)}>
      {children}
    </div>
  );
};

export default MainWrapper;
