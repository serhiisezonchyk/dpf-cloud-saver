import React from 'react';
import './BorderedImage.scss';
import { cn } from '@/lib/utils';
const BorderedImage = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  return (
    <div className={cn('bordered-image', className)}>
      <img src={src} alt='' />
    </div>
  );
};

export default BorderedImage;
