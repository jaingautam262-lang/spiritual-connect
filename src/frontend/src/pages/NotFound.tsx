import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export default function NotFound() {
  const quickLinks = [
    { to: "/", label: "Home", emoji: "🏠" },
    { to: "/aarti", label: "Aarti", emoji: "🪔" },
    { to: "/mantra", label: "Mantras", emoji: "🔔" },
    { to: "/bhagavad-gita", label: "Bhagavad Gita", emoji: "📖" },
  ];

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16"
      data-ocid="notfound.page"
    >
      {/* Decorative glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        {/* Om symbol */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-8xl mb-6 select-none"
          aria-hidden="true"
        >
          ॐ
        </motion.div>

        {/* 404 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-9xl font-bold text-primary/20 leading-none mb-2 tracking-tight"
        >
          404
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-display text-3xl font-bold text-foreground mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed mb-2"
        >
          The path you seek leads elsewhere.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-muted-foreground text-base mb-8 italic"
        >
          Let us guide you home.
        </motion.p>

        {/* Return to Home CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-md hover:bg-primary/90 transition-colors duration-200"
            data-ocid="notfound.home_button"
          >
            🏠 Return to Home
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or explore</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {quickLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-foreground text-sm hover:border-primary hover:text-primary transition-colors duration-200"
              data-ocid={`notfound.quick_link.${i + 1}`}
            >
              <span>{link.emoji}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Decorative lotus */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 text-3xl select-none"
          aria-hidden="true"
        >
          🪷
        </motion.p>
      </motion.div>
    </div>
  );
}
