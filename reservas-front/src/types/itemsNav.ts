import type { IconProps } from '@tabler/icons-react';
import type React from 'react';

export type NavIcon = React.FC<IconProps>;

export interface ItemsNav {
  title: string;
    url: string;
    icon?: NavIcon;
}