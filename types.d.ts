import { ReactNode } from 'react';

declare module 'next' {
  interface PageProps {
    params?: { [key: string]: string };
    children?: ReactNode;
  }
}
