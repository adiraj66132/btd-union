import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full overflow-y-auto scroll-smooth bg-background">
          <Header />
          <main className="w-full">
            <section id="home" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
              <Home />
            </section>
            <section id="profiles" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
              <Profiles />
            </section>
            <section id="about" className="min-h-screen w-full scroll-smooth flex items-center justify-center">
              <About />
            </section>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
