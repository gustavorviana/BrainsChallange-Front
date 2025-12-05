import React, { ReactNode } from "react";

interface TableLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    searchSlot?: ReactNode;
}

export default function Home({
    children,
    title,
    description,
    searchSlot
}: TableLayoutProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">{title}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        {description}
                    </p>
                </div>
            </div>

            {searchSlot && (
                <div className="mt-4">
                    {searchSlot}
                </div>
            )}

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
