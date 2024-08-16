'use client';

import ThemeSwitch from '@/components/common/ThemeSwitch/ThemeSwitch';
import { useToast } from '@/components/ui/use-toast';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import useProfile from './(user)/profile/hooks/useProfile';

const HomePage = () => {
  const session = useSession();
  const { toast } = useToast();

  const { userData } = useProfile();

  console.log(session);
  return (
    <div className="">
      <div>{JSON.stringify(userData)}</div>
      <ThemeSwitch />
      <Link href={'/login'}>Login</Link>
      <Link href={'/register'}>Register</Link>

      <button
        onClick={() => {
          signOut();
          toast({
            title: 'This is toast',
            description: 'This is description',
            variant: 'warn',
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
