import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
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
