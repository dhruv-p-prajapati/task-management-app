import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-secondary">
      <Image
        src={'/images/loader.gif'}
        alt="Loading..."
        width={250}
        height={250}
      />
    </div>
  );
};

export default Loading;
