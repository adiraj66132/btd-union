import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const members = [
  {
    name: "Adiraj",
    description: "<Error>No valid data found.</Error>"
  },
  {
    name: "Angshuman",
    description: "He's that one friend who mixes well with everyone—friendly, adaptable, and easygoing. Whether with introverts or extroverts, he fits right in, making everyone feel included and comfortable."
  },
  {
    name: "Dawar",
    description: "A genuine and brilliant individual, known as an academic topper with a passion for learning. A true cricket enthusiast, loyal RCB lover, and an ardent admirer of Virat Kohli's legacy."
  },
  {
    name: "Isandeep",
    description: "He's the kind of person who lights up every room—quick-witted, full of playful charm, and always ready with a hilarious story that leaves everyone laughing and wanting more."
  },
  {
    name: "Gaurav",
    description: "The joker(attraction) of the group. Brings laughter and light-heartedness to every discussion. Never a dull moment with him around."
  },
  {
    name: "Prabal",
    description: "He's flirty and a little naughty—always playful with his words, charming with his smile. He knows how to keep conversations exciting, mixing mischief with smooth confidence. A true teaser."
  }
];

import ParallaxSection from '@/components/ParallaxSection';

const About = () => {
  const [openMember, setOpenMember] = useState<string | null>(null);

  return (
    <ParallaxSection className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16 text-glow drop-shadow-blur"
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            About Us
          </span>
        </motion.h1>

        <div className="space-y-6">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/10 ${openMember === member.name ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''
                }`}
              onClick={() => setOpenMember(openMember === member.name ? null : member.name)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white/90">
                  {member.name}
                </h3>
                {openMember === member.name ? (
                  <ChevronUp className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/40" />
                )}
              </div>
              <motion.div
                initial={false}
                animate={{
                  height: openMember === member.name ? 'auto' : 0,
                  opacity: openMember === member.name ? 1 : 0,
                  marginTop: openMember === member.name ? 16 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden text-muted-foreground/80 leading-relaxed font-light"
              >
                {member.description}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default About;
