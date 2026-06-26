import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, Palette, Cloud, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function TopNavBar() {
  const { activeTab, setActiveTab, notifications } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'almanac', label: 'Almanac' },
    { id: 'collection', label: 'Stickers' },
    { id: 'chat', label: 'Ghost Chat' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('dashboard');
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-surface-container border-b-2 border-outline-variant shadow-ghost h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-window-margin">
      {/* Logo */}
      <div className="flex items-center gap-md">
        <motion.h1
          className="font-pixel text-headline-md font-bold text-primary tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          Weather Ghost
          <span className="text-label-sm text-on-surface-variant ml-2 opacity-60">v1.0</span>
        </motion.h1>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center ml-xl gap-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-fredoka text-body-md pb-1 transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-sm">
        {/* Search */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.form
              onSubmit={handleSearch}
              className="flex items-center gap-sm"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <div className="bg-surface-container-low rounded-lg border-2 border-outline-variant px-sm py-1 flex items-center gap-sm">
                <Search className="w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search a ghost town..."
                  className="bg-transparent border-none focus:ring-0 font-nunito text-label-lg w-48 placeholder:text-on-surface-variant/50 outline-none"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-surface-container rounded transition-colors"
              >
                <X className="w-4 h-4 text-on-surface-variant" />
              </button>
            </motion.form>
          ) : (
            <motion.button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-container hover:scale-105 transition-all active:translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5 text-primary" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-container hover:scale-105 transition-all active:translate-y-0.5 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="absolute right-0 top-12 w-80 ghost-window bg-surface z-50 max-h-96 overflow-y-auto"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-md border-b border-outline-variant">
                  <span className="font-pixel text-label-lg text-on-surface">Notifications</span>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-md text-center">
                    <Cloud className="w-8 h-8 text-outline-variant mx-auto mb-2" />
                    <p className="font-nunito text-label-sm text-on-surface-variant">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-md border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors ${
                        !n.read ? 'bg-primary-fixed/30' : ''
                      }`}
                    >
                      <p className="font-nunito text-label-sm font-bold text-on-surface">
                        {n.title}
                      </p>
                      <p className="font-fredoka text-body-md text-on-surface-variant mt-1">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <motion.button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-container hover:scale-105 transition-all active:translate-y-0.5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="w-5 h-5 text-primary" />
        </motion.button>

        {/* Theme */}
        <motion.button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-container hover:scale-105 transition-all active:translate-y-0.5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette className="w-5 h-5 text-primary" />
        </motion.button>
      </div>
    </header>
  );
}
