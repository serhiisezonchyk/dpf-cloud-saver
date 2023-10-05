import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import './UserAccountNav.scss';
interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}
const UserAccountNav = ({ email, imageUrl, name }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='dropdown-menu-trigger'>
        <Button className='rounded-full h-8 w-8 aspect-square focus-visible:ring-0 focus-visible:ring-offset-0'>
          <Avatar className='avatar'>
            {imageUrl ? (
              <div className='relative aspect-square h-full w-full '>
                <Image
                  fill
                  src={imageUrl}
                  alt='profile_picture'
                  referrerPolicy='no-referrer'
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className='sr-only'>{name}</span>
                <User className='h-4 w-4 text-primary' />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='dropdown-menu-content' align='end'>
        <div className='dropdown-menu-content-text-wrapper'>
          <div className='dropdown-menu-content-text'>
            {name && <p className='main'>{name}</p>}
            {email && <p>{email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">Вийти</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
