'use client';
import React from 'react';
import Uploadbutton from '../upload-button/Uploadbutton';
import { trpc } from '@/app/_trpc/client';
import { CircleOff, Loader2, MessageSquare, Plus, Trash } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Button } from '../ui/button';
import './Dashboard.scss';
const DashboardComp = () => {
  const [currDelFile, setCurrDelFile] = React.useState<string | null>(null);
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrDelFile(id);
    },
    onSettled() {
      setCurrDelFile(null);
    },
  });
  return (
    <main>
      <div className='top-dashboard'>
        <h1>Мої файли</h1>
        <Uploadbutton />
      </div>
      {isLoading ? (
        <Skeleton height={100} className='skeleton' count={3} />
      ) : data && data?.length !== 0 ? (
        <>
          <div className='files-container'>
            {data
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((item) => (
                <div key={item.id} className='file-item'>
                  <Link
                    href={`/dashboard/${item.id}`}
                    className='flex flex-col'
                  >
                    <div className='file-item-top'>
                      <div className='file-item-top-avatar'></div>
                      <div className='file-item-top-text-wrapper'>
                        <div className='file-item-top-text-container'>
                          <h3>{item.name}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='file-item-footer'>
                    <div>
                      <Plus className='h-4 w-4' />
                      {dayjs(item.createdAt).format('DD/MM/YYYY')}
                    </div>
                    <Button
                      size='sm'
                      variant='destructive'
                      className='w-1/3 '
                      onClick={() => deleteFile({ id: item.id })}
                    >
                      {currDelFile === item.id ? (
                        <Loader2 className='w-4 h-4 animate-spin' />
                      ) : (
                        <Trash className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className='empty-list-container'>
          <CircleOff className='h-[30px] w-[30px]' />
          <p>Файлів не знайдено.</p>
        </div>
      )}
    </main>
  );
};

export default DashboardComp;
