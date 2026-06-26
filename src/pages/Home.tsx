import { useAppStore } from '../store/useAppStore';
import Dashboard from './Dashboard';
import Forecast from './Forecast';
import Almanac from './Almanac';
import GhostCollection from './GhostCollection';
import GhostChat from './GhostChat';
import Settings from './Settings';

export default function Home() {
  const { activeTab } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'forecast':
        return <Forecast />;
      case 'almanac':
        return <Almanac />;
      case 'collection':
        return <GhostCollection />;
      case 'chat':
        return <GhostChat />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {renderContent()}
    </div>
  );
}
