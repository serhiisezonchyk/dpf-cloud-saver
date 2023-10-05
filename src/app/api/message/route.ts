import { prisma } from '@/db';
import { MessageValidator } from '@/lib/validators/MessageValidator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const { id: userId } = user;
  if (!userId) return new Response('Unathorized', { status: 401 });
  const { fileId, message } = MessageValidator.parse(body);
  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });
  if (!file) return new Response('Not found', { status: 404 });
  await prisma.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  });
};
