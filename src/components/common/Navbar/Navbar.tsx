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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { IUser, UserRole } from '@/types/user.types';
import { ILinkItem } from '@/types/link.types';
import { NavbarLinksUser, NavbarLinsAdmin } from './NavbarLinksAsPerUserRoles';
import {
  TbCircleLetterTFilled,
  TbCircleLetterM,
  TbCircleLetterAFilled,
} from 'react-icons/tb';
import { redirect, useRouter } from 'next/navigation';
import { RouteConstants } from '@/constants/routes.constants';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import useProfile from '@/app/(app)/(user)/profile/hooks/useProfile';
import Loading from '@/app/loading';

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  const { userData, isUserDataLoading, isUserDataError } = useProfile<IUser>();

  const NavbarLinks =
    session?.data?.user?.role === UserRole.USER
      ? NavbarLinksUser
      : NavbarLinsAdmin;

  const handleNavigateToHome = () => {
    router.push(RouteConstants.HOME);
  };

  const handleNavigateToProfile = () => {
    router.push(RouteConstants.PROFILE);
  };

  const handleLogout = () => {
    signOut();
  };

  if (isUserDataLoading) {
    return <Loading />;
  }

  if (isUserDataError) {
    redirect(RouteConstants.NOT_FOUND);
  }

  return (
    <div className="shadow-md">
      <nav className="container flex h-16 w-full items-center justify-between bg-background">
        <div
          className="flex cursor-pointer items-center gap-0"
          onClick={handleNavigateToHome}
        >
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
                <div>
                  <CustomAvatar
                    imgUrl={userData?.imgUrl as string}
                    name={userData?.name as string}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleNavigateToProfile}>
                  Profile
                </DropdownMenuItem>
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
              <ul className="mt-10 flex w-52 flex-col gap-2">
                {NavbarLinks.map((navbarLink: ILinkItem) => {
                  return (
                    <SheetClose asChild key={navbarLink.slug}>
                      <Link href={navbarLink.slug} key={navbarLink.slug}>
                        <li className="flex items-center justify-start gap-2 rounded border-foreground px-3 py-1 duration-300 hover:bg-foreground hover:text-background">
                          <span className="24px">{navbarLink.icon}</span>{' '}
                          {navbarLink.label}
                        </li>
                      </Link>
                    </SheetClose>
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
