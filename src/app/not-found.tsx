'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFondPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, looks like you have stumbled into the void!
        </h1>
        <p className="mt-4 text-muted-foreground">
          This task has been lost in the abyss. Let&apos;s get you back on
          track.
        </p>
        <div className="mt-6">
          <div className="mt-6">
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFondPage;
