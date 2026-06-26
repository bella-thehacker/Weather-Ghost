import { motion } from 'framer-motion';
import { Home, Cloud, BookOpen, Sparkles, MessageCircle, Settings } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import GhostCompanion from '../components/GhostCompanion';
import PixelButton from '../components/PixelButton';
import SparkleDecoration from '../components/SparkleDecoration';

export default function SideNavBar() {
  const { activeTab, setActiveTab, ghosts } = useAppStore();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'forecast', label: 'Forecast', icon: <Cloud className="w-5 h-5" /> },
    { id: 'almanac', label: 'Almanac', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'collection', label: 'Gallery', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'chat', label: 'Ghost Chat', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'settings', label: 'System', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col gap-md p-md w-64 fixed left-0 top-16 bottom-0 border-r-2 border-outline-variant bg-surface-container-low z-40">
      {/* Ghost Profile Card */}
      <motion.div
        className="flex flex-col items-center p-lg bg-surface rounded-xl ghost-window mb-md relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SparkleDecoration className="-top-1 -left-1" size="sm" />
        <SparkleDecoration className="-bottom-1 -right-1" size="sm" color="#b9aed4" />

        <GhostCompanion
          quote="The clouds have clearly been overthinking today."
          showSpeech={true}
          size="md"
        />
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col gap-sm flex-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-md p-3 rounded-lg transition-all text-left ${
              activeTab === item.id
                ? 'bg-primary-container text-on-primary-container border-2 border-primary scale-[0.98]'
                : 'text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container hover:translate-x-1'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <span className={activeTab === item.id ? 'text-primary' : ''}>{item.icon}</span>
            <span className="font-nunito text-label-lg">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Collection Progress */}
      <motion.div
        className="bg-surface rounded-xl p-md ghost-window"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-nunito text-label-sm text-on-surface-variant">Collection</span>
          <span className="font-pixel text-label-sm text-primary">
            {ghosts.filter((g) => g.isUnlocked).length}/{ghosts.length}
          </span>
        </div>
        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-bubblegum-pink rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(ghosts.filter((g) => g.isUnlocked).length / ghosts.length) * 100}%`,
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Summon Button */}
      <motion.div
        className="mt-auto pt-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <PixelButton variant="primary" size="md" fullWidth icon={<Sparkles className="w-4 h-4" />}>
          Summon Sparkles
        </PixelButton>
      </motion.div>
    </aside>
  );
}
