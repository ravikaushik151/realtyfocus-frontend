import { ReactNode } from 'react';

declare module 'next' {
  export interface ProjectDetailPageProps {
    params?: Record<string, string>;
    /*searchParams?: Record<string, string | string[]>;*/
    children?: ReactNode;
  }
}