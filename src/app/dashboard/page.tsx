import { prisma } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import DashboardComp from '@/components/dashboard/Dashboard';
const Dashboard = async() => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');
  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect('/auth-callback?origin=dashboard');
  return <DashboardComp/>
};

export default Dashboard;
