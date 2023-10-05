import React from 'react';
import './GreetPage.scss';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import './GreetPage.scss';
const GreetPage = () => {
  return (
    <>
      <div className='fake-button'>
        <p>Спробуй безкоштовно</p>
      </div>
      <h1>
        Зберігай свої <span className='text-primary'> файли</span> віддалено.
      </h1>
      <p>Безкоштовний сервіс для зберігання pdf файлів</p>
      <Link className={buttonVariants()} href='/dashboard' target='_blank'>
        Почати <ArrowRight className='ml-2 w-5 h-5' />
      </Link>
    </>
  );
};

export default GreetPage;
