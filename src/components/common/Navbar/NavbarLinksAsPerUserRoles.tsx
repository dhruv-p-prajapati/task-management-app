import { ILinkItem } from '@/types/link.types';
import { GrProjects, GrTasks } from 'react-icons/gr';
import { FiUsers } from 'react-icons/fi';

export const NavbarLinksUser: ILinkItem[] = [
  {
    label: 'My Tasks',
    slug: '/my-tasks',
    icon: <GrProjects />,
  },
  {
    label: 'My Projects',
    slug: '/my-projects',
    icon: <GrTasks />,
  },
];

export const NavbarLinsAdmin: ILinkItem[] = [
  {
    label: 'Projects',
    slug: '/projects',
    icon: <GrProjects />,
  },
  {
    label: 'Users',
    slug: '/users',
    icon: <FiUsers />,
  },
];
