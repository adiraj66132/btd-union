import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from 'framer-motion';

const Home = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <section className="max-w-4xl mx-auto text-center space-y-8 fade-in">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tighter
                  bg-gradient-to-r from-red-500 via-red-600 to-red-500 
                  bg-clip-text text-transparent 
                  pb-2 relative z-10"
                initial={{ backgroundPosition: "200% 0" }}
                animate={{ backgroundPosition: "0% 0" }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
              >
                A Brotherhood of Fun<br className="hidden md:block" /> and Memories
              </motion.h1>
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 -z-10" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BTD isn't just a group - it's a family of fun, laughter and crazy memories.
              Each member has a special role that makes the gang complete.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDialog(true)}
              className="px-8 py-3 rounded-full font-medium transition-all duration-300
                bg-gradient-to-r from-red-500 to-red-600 text-white
                hover:from-red-600 hover:to-red-700
                shadow-lg hover:shadow-xl hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Join Us
            </button>
            <button
              onClick={() => document.getElementById('profiles')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full font-medium transition-all duration-300
                bg-background border border-border text-foreground
                hover:bg-accent hover:border-accent-foreground
                shadow-md hover:shadow-lg hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Meet the Team
            </button>
          </div>
        </section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Memories",
                description: "We create unforgettable experiences that last a lifetime."
              },
              {
                title: "Support Each Other",
                description: "We're always there for each other through thick and thin."
              },
              {
                title: "Have Fun",
                description: "Life is too short not to enjoy every moment together."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="profile-card p-6 rounded-xl bg-card border border-border
                  shadow-md hover:shadow-lg transition-all duration-300
                  hover:scale-105 hover:border-accent"
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
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
