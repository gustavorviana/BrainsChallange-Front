import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth'

interface LoginLayoutProps {
    children: ReactNode;
    title: string;
}

export default function AuthLayout({ children, title }: LoginLayoutProps) {
    const navigate = useNavigate()
    const { authStatus } = useAuth();

    useEffect(() => {
        if (authStatus === 'Authenticated')
            navigate('/')
    }, [authStatus]);

    if (authStatus !== 'Unauthenticated')
        return <></>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    {title}
                </h1>

                {children}
            </div>
        </div>
    );
}
