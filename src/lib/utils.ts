import UserRoleRoutes from '@/routes/routes';
import { UserRole } from '@/types/user.types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function doesRoleHaveAccessToURL(role: UserRole, url: string) {
  const accessibleRoutes = UserRoleRoutes[role] || [];
  return accessibleRoutes.some((route) => {
    const regexPattern = route.replace(/\[.*?\]/g, '[^/]+').replace('/', '\\/');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(url);
  });
}
