import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from 'framer-motion';

import ParallaxSection from '@/components/ParallaxSection';

const Home = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Spotlight Effect specifically for Home */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/15 blur-[80px] rounded-full pointer-events-none z-0" />

      <ParallaxSection offset={50} className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-glow drop-shadow-blur">
              <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                Brotherhood
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-light text-foreground/80">
                of Fun & Memories
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              BTD isn't just a group - it's a family.
              <span className="block mt-2 text-sm uppercase tracking-widest opacity-60">Est. Forever</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <button
              onClick={() => setShowDialog(true)}
              className="group relative px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 liquid-glass-strong liquid-hover text-white overflow-hidden"
            >
              <span className="relative z-10">Join Us</span>
              <div className="absolute inset-0 rounded-full bg-white blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            </button>
            <button
              onClick={() => document.getElementById('profiles')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-medium liquid-glass text-white transition-all hover:scale-105 liquid-hover"
            >
              Our Gang →
            </button>
          </motion.div>
        </div>
      </ParallaxSection>

      <section className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Unforgettable",
              desc: "Moments that last a lifetime.",
              icon: "✨"
            },
            {
              title: "Unbreakable",
              desc: "A bond stronger than steel.",
              icon: "🛡️"
            },
            {
              title: "Unlimited",
              desc: "Fun that never ends.",
              icon: "🚀"
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-2xl liquid-glass liquid-hover transition-all duration-500 hover:-translate-y-2">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md liquid-glass-strong border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              Membership Closed
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">We don't accept new blood. Ever.</p>
            <p className="text-muted-foreground">
              BTD brotherhood is exclusive and closed to new members.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
