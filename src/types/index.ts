import { ComponentType, ReactNode } from 'react';

type MainTab = {
  name: string,
  title: string,
  component: ComponentType<any>,
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => ReactNode;
};

type Eatery = {
  id: number;
  title: string;
  description: string;
  address: string;
};

export { MainTab, Eatery };
