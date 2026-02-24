import type { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
    activePage: string;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0A0A1A] text-white font-sans flex items-center justify-center">
            {/* Background stars or gradient based on Figma can go here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0A1A] to-[#0A0A1A] opacity-80" />

            {/* Main Content Area with 3D Perspective */}
            <main className="relative z-10 w-full max-w-7xl h-[90vh] perspective-1000 flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}
