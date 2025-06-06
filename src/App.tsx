import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Profiles = lazy(() => import("./pages/Profiles"));
const About = lazy(() => import("./pages/About"));

// Optimize QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full overflow-y-auto scroll-smooth bg-background">
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
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
