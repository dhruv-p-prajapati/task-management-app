import { cn } from '@/lib/utils';
import React from 'react';

interface ISummaryCardProps {
  noOfItems: number;
  title: string;
  borderColor?: string;
}

const SummaryCard = ({ noOfItems, title, borderColor }: ISummaryCardProps) => {
  return (
    <div
      className={cn(
        'flex border-separate flex-col items-center justify-center gap-2 rounded border-[2px] border-l-8 border-primary px-8 py-2 shadow-md',
        borderColor,
      )}
    >
      <h2 className="text-4xl font-bold">{noOfItems}</h2>
      <p className="text-sm font-semibold opacity-80">{title}</p>
    </div>
  );
};

export default SummaryCard;
