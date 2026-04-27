import { motion } from 'motion/react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
        className="w-12 h-12 border-4 border-slate-900 border-t-transparent"
      />
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500 animate-pulse">
        Processing Data...
      </p>
    </div>
  );
}
