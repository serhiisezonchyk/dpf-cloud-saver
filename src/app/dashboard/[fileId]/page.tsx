import PdfComponent from '@/components/pdf-component/PdfComponent';
import { prisma } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
interface PageProps {
  params: {
    fileId: string;
  };
}
const EachFilePage = async ({ params }: PageProps) => {
  const { fileId } = params;
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);
  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });
  if (!file) notFound();
  return (
    <div className='flex-1 justify-between flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full grow lg:flex '>
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            <PdfComponent url={file.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachFilePage;
