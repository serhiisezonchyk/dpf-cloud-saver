'use client';
import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import './MobileNav.scss';
const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  const toggleOpen = () => setOpen((prev) => !prev);
  React.useEffect(() => {
    if (open) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };
  return (
    <div className='mobile-nav'>
      <Menu className='mobile-nav-menu' onClick={toggleOpen} />
      {open ? (
        <div className='open-menu'>
          <ul>
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    href='/sign-in'
                  >
                    Увійти
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    href='/sign-up'
                  >
                    Зареєструватися
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    href='/dashboard'
                  >
                    Файли
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link href='/sign-out'>Вийти</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
