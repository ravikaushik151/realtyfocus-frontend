import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import ProjectListWithQuery from './ProjectListWithQuery';

export default function ProjectsPage() {
  return (
    <RootLayout>
      {/* Wrap client component with Suspense */}
      <React.Suspense fallback="Loading...">
        <ProjectListWithQuery />
      </React.Suspense>
    </RootLayout>
  );
}