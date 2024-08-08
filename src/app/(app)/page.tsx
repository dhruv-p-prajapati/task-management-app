'use client';

import ThemeSwitch from '@/components/common/ThemeSwitch/ThemeSwitch';
import { useToast } from '@/components/ui/use-toast';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  const session = useSession();
  const { toast } = useToast();

  console.log(session);
  return (
    <div className="">
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
