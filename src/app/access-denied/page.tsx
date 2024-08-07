'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const AccessDeniedPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          It looks like the page yo&apos;re trying to access doesn&apos;t exist.
          Don&apos;t worry, we&apos;re here to help You!
        </p>
        <div className="mt-6">
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
