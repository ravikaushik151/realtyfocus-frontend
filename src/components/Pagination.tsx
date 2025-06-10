"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string; // e.g., '/builders/page'
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            router.push(`${basePath}/${newPage}`);
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            for (let i = 1; i <= 10; i++) pages.push(i);
            if (currentPage < totalPages - 1 && currentPage <= 10) pages.push("...");
            pages.push(totalPages - 1, totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                ← Prev
            </button>

            <div className="flex space-x-1">
                {pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "..." ? (
                            <span className="px-2">...</span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(Number(page))}
                                className={`px-3 py-1 rounded ${currentPage === page
                                        ? "bg-realty-red text-white"
                                        : "bg-gray-200 hover:bg-realty-red hover:text-white"
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next →
            </button>
        </div>
    );
}
