import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const profiles = [
  {
    name: "Adiraj",
    role: "Development & UI/UX Designer",
    subtitle: "Fullstack-Developer",
    instagram: "@ark_adiraj",
    instagramUrl: "https://instagram.com/ark_adiraj",
    image: "/Images/adi.jpg"
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
    instagram: "@instagram",
    instagramUrl: "https://instagram.com/instagram",
    image: "/Images/dawar.jpg"
  },
  {
    name: "Ishandeep",
    role: "mischievous guy",
    subtitle: "Humorous",
    instagram: "@ishandeepkalita",
    instagramUrl: "https://instagram.com/ishandeepkalita",
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
    instagramUrl: "https://instagram.com/prabal___freestyle",
    image: "/Images/prabal.png"
  }
];

const Profiles = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
        >
          Our Profiles
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 bg-card rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-white/40">
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {profile.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-1">{profile.role}</p>
                  <p className="text-sm italic text-muted-foreground mb-6">{profile.subtitle}</p>
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-background border border-white/20 text-foreground hover:bg-accent hover:border-white/40 transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>{profile.instagram}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
