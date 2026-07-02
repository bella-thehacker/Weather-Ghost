import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import SparkleDecoration from '../components/SparkleDecoration';
import FloatingDecorations from '../components/FloatingDecorations';
import { useSparkles } from '../hooks/useSparkles';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { sparkles, summonSparkles } = useSparkles();
  const colors = ['#ffd9e5', '#FFF4CC', '#D4F8E8', '#E8DDFF'];

  return (
    <div className="min-h-screen bg-surface font-nunito text-on-surface relative select-none">
      {/* Interactive 90s OS Window background cloud drift patterns */}
      <FloatingDecorations />

      {/* Global Sparkle Acceleration View Overlay Layer Element */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sparkle, index) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.4, 1, 0], 
                opacity: [0, 1, 1, 0],
                rotate: [0, 45, -45, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            >
              <SparkleDecoration
                size={sparkle.size}
                color={colors[index % colors.length]}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Primary OS Frame Bars */}
      <TopNavBar />
      
      <div className="flex pt-16 h-[calc(100vh-64px)]">
        {/* Pass the function straight to the sidebar instance handler trigger */}
        <SideNavBar onSummon={summonSparkles} />
        
        <main className="flex-1 overflow-y-auto p-md lg:p-lg md:ml-64 custom-scrollbar relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}