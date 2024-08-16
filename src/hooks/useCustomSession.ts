'use client';

import { useSession } from 'next-auth/react';

const useCustomSession = () => {
  const session = useSession();
  const isAuthenticated = session?.status === 'authenticated' ? true : false;
  const user = session?.data?.user;
  const role = session?.data?.user.role;
  const userId = session?.data?.user.id;
  return { isAuthenticated, user, role, userId };
};

export default useCustomSession;
