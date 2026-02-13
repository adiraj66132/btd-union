import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const Profiles = lazy(() => import("./pages/Profiles"));
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <style>{`
        .loader {
          height: 60px;
          aspect-ratio: 2;
          border-bottom: 3px solid #524656;
          position: relative;
          overflow: hidden;
        }
        .loader:before {
          content: "";
          position: absolute;
          inset: auto 42.5% 0;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #CF4647;
          animation: 
            l1-0 .5s cubic-bezier(0,900,1,900) infinite,
            l1-1 2s linear infinite;
        }
        @keyframes l1-0 {
          0%,2% {bottom: 0%}
          98%,to {bottom:.1%}
        }
        @keyframes l1-1 {
          0% {translate: -500%}
          to {translate: 500%}
        }
      `}</style>
      <div className="loader" />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500" />
  </div>
);

const AppContent = () => (
  <>
    <Header />
    <main className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <section id="home" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
          <Home />
        </section>
        <section id="profiles" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
          <Profiles />
        </section>
        <section id="about" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
          <About />
        </section>
      </Suspense>
    </main>
  </>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
          <div className={`min-h-screen w-full overflow-y-auto scroll-smooth bg-background transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <AppContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
