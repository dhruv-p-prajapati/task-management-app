'use client';

import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserRole } from '@/types/user.types';
import { ILinkItem } from '@/types/link.types';
import { NavbarLinksUser, NavbarLinsAdmin } from './NavbarLinksAsPerUserRoles';
import {
  TbCircleLetterTFilled,
  TbCircleLetterM,
  TbCircleLetterAFilled,
} from 'react-icons/tb';

const Navbar = () => {
  const session = useSession();
  console.log({ session });
  const NavbarLinks =
    session?.data?.user?.role === UserRole.USER
      ? NavbarLinksUser
      : NavbarLinsAdmin;

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="shadow-md">
      <nav className="container flex h-16 w-full items-center justify-between bg-background">
        <div className="flex cursor-pointer items-center gap-0">
          <span>
            <TbCircleLetterTFilled className="-rotate-[15deg] text-3xl" />
          </span>
          <span>
            <TbCircleLetterM className="text-4xl" />
          </span>
          <span>
            <TbCircleLetterAFilled className="rotate-[15deg] text-3xl" />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <ThemeSwitch />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9 cursor-pointer">
                  <AvatarImage src="/placeholder-user.jpg" alt="" />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <GiHamburgerMenu className="cursor-pointer text-2xl" />
            </SheetTrigger>
            <SheetContent className="w-auto">
              <ul className="mt-10 flex flex-col gap-3 pl-2 pr-20">
                {NavbarLinks.map((navbarLink: ILinkItem) => {
                  return (
                    <li
                      className="flex items-center justify-start gap-2"
                      key={navbarLink.slug}
                    >
                      <span className="24px">{navbarLink.icon}</span>
                      <Link href={navbarLink.slug}>{navbarLink.label}</Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
