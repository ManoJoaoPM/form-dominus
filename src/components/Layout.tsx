import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-dominus-bg">
      {/* Top Navigation Bar */}
      <div className="w-full flex items-center justify-center md:justify-start px-6 md:px-12 py-4 bg-dominus-text relative z-50 h-16">
        <img src="/LOGO DOMINUS 3.png" alt="Dominus" className="h-8 md:h-8 object-contain" />
      </div>

      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-dominus-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-dominus-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {children}
    </div>
  );
}
