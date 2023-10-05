import React from 'react';
import './Navbar.scss';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server';
import UserAccountNav from './user-account/UserAccountNav';
import MobileNav from './mobile-nav/MobileNav';
const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <Link href={'/'} className='font-bold'>
          Головна
        </Link>
        <MobileNav isAuth={!!user}/>
        <div className='navbar-medium'>
          {!user ? (
            <>
              <LoginLink
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Увійти
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: 'sm',
                })}
              >
                Зареєструватися
              </RegisterLink>
            </>
          ) : (
            <div className='navbar-div-item-handler'>
              <Link href={'/dashboard'} className='font-bold'>
                Файли
              </Link>
              <UserAccountNav
                name={
                  !user.given_name || !user.family_name
                    ? 'Користувач'
                    : `${user.given_name} ${user.family_name}`
                }
                email={user.email ?? ''}
                imageUrl={user.picture ?? ''}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
