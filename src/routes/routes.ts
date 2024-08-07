import { UserRole } from '@/types/user.types';

const UserRoleRoutes = {
  [UserRole.ADMIN]: [
    '/admin',
    '/projects',
    '/project/[id]',
    '/tasks',
    'task/[id]',
  ],
  [UserRole.USER]: [
    '/',
    '/profile/[id]',
    '/projects',
    '/projects/[id]',
    '/projects/[id]/tasks',
    '/projects/[id]/tasks/[id]',
  ],
};

export default UserRoleRoutes;
