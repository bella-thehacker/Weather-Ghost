import { type ReactNode } from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import FloatingDecorations from '../components/FloatingDecorations';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface relative">
      <FloatingDecorations />
      <TopNavBar />
      <SideNavBar />

      {/* Main Content */}
      <main className="md:ml-64 pt-16 min-h-screen relative z-10">
        <div className="p-window-margin pb-24 md:pb-window-margin">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-surface-container border-2 border-outline-variant rounded-xl flex items-center justify-around shadow-ghost z-50">
        {[
          { id: 'dashboard', icon: 'home', label: 'HOME' },
          { id: 'forecast', icon: 'cloud', label: 'FORECAST' },
          { id: 'collection', icon: 'auto_awesome', label: 'GALLERY' },
          { id: 'chat', icon: 'chat_bubble', label: 'CHAT' },
        ].map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-0.5 text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-[9px] font-nunito font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
