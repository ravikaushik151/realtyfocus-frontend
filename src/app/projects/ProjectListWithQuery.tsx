// app/projects/ProjectListWithQuery.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import ProjectList from './ProjectList';

export default function ProjectListWithQuery() {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    return <ProjectList currentPage={currentPage} />;
}