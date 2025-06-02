import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const members = [
  {
    name: "Adiraj",
    description: "He is a full-stack programmer with a mind full of creative ideas. A true problem-solver, passionate about building smart solutions—oh, and a proud Linux user who loves clean, efficient systems."
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

const About = () => {
  const [openMember, setOpenMember] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>
        <div className="space-y-6">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="profile-card cursor-pointer p-6 rounded-xl bg-card border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setOpenMember(openMember === member.name ? null : member.name)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {member.name}
                </h3>
                {openMember === member.name ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
              <div
                className={`mt-4 text-muted-foreground overflow-hidden transition-all duration-300 ${
                  openMember === member.name ? 'max-h-40' : 'max-h-0'
                }`}
              >
                {member.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
