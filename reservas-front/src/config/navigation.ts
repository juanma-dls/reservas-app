import type { UserType } from '@/types/auth';
import type { NavIcon } from '@/types/itemsNav';
import { IconUsers, IconCalendar } from '@tabler/icons-react';

export interface NavItem {
  title: string;
  url: string;
  icon?: NavIcon;
  allowedTypes?: UserType[];
}

export const navMain: NavItem[] = [
  {
    title: 'Users',
    url: '/users',
    icon: IconUsers,
    allowedTypes: ['ADMIN'],
  },
  {
    title: 'Mis turnos',
    url: '/appointments',
    icon: IconCalendar,
  },
];
