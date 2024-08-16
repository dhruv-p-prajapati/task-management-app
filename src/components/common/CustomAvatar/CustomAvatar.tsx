import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface ICustomAvatarProps {
  imgUrl?: string;
  name?: string;
  className?: string;
}

const CustomAvatar = ({
  imgUrl,
  name = 'Unknown',
  className,
}: ICustomAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imgUrl} alt={name} />
      <AvatarFallback>{name?.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
