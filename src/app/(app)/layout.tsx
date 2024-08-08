import Navbar from '@/components/common/Navbar/Navbar';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default AppLayout;
