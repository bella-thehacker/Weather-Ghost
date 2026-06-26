import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import OpeningAnimation from './components/OpeningAnimation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OpeningAnimation />
      <AppLayout>
        <Home />
      </AppLayout>
    </QueryClientProvider>
  );
}
