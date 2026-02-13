import { memo } from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';

interface Profile {
  name: string;
  role: string;
  subtitle: string;
  instagram: string;
  instagramUrl: string;
  image: string;
}

const ProfileCard = memo(({ profile, index }: { profile: Profile; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="group w-full max-w-[350px]"
  >
    <div className="h-full p-6 rounded-3xl liquid-glass liquid-hover transition-all duration-500 hover:-translate-y-2 group-hover:border-white/20 select-none">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-inner">
          <img
            src={profile.image}
            alt={profile.name}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-glow transition-all duration-300">
          {profile.name}
        </h3>
        <p className="text-lg font-medium text-white/80 mb-2">
          {profile.role}
        </p>
        <p className="text-sm tracking-widest uppercase text-white/40 mb-6">
          {profile.subtitle}
        </p>

        {profile.instagram && (
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 hover:border-white/30 backdrop-blur-md"
          >
            {profile.instagram}
          </a>
        )}
      </div>
    </div>
  </motion.div>
));

ProfileCard.displayName = 'ProfileCard';

const profiles = [
  {
    name: "Adiraj",
    role: "------",
    subtitle: "Developer",
    instagram: "@adiraj",
    instagramUrl: "https://instagram.com/adiraj_ark",
    image: "/Images/adi.png"
  },
  {
    name: "Angsuman",
    role: "Helper",
    subtitle: "Philomath",
    instagram: "@angshu_man_15",
    instagramUrl: "https://instagram.com/angshu_man_15",
    image: "/Images/angshuman.jpg"
  },
  {
    name: "Dawar",
    role: "Academic Achiever",
    subtitle: "High Achiever",
    instagram: "@dawar",
    instagramUrl: "https://www.instagram.com/dsta.lker18/",
    image: "/Images/dawar.jpg"
  },
  {
    name: "Ishandeep",
    role: "mischievous guy",
    subtitle: "Humorous",
    instagram: "@ishandeepkalita",
    instagramUrl: "https://instagram.com/ishandeepkalita7",
    image: "/Images/ishandeep.jpg"
  },
  {
    name: "Gaurav",
    role: "Attraction",
    subtitle: "Backbone of BTD",
    instagram: "@gaurav.g_1",
    instagramUrl: "https://instagram.com/gaurav.g_1",
    image: "/Images/gaurav.jpg"
  },
  {
    name: "Prabal",
    role: "Casanova",
    subtitle: "Frontbone of BTD",
    instagram: "@prabal___freestyle",
    instagramUrl: "https://www.instagram.com/prabal____freestyle___/",
    image: "/Images/prabal.png"
  }
];

const Profiles = () => {
  return (
    <ParallaxSection className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16 text-glow drop-shadow-blur"
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Our Profiles
          </span>
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-center">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.name} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Profiles;
