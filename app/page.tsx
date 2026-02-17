"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* Cinematic Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

      {/* Soft Pink Spotlight */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-600 blur-[200px] opacity-20" />

      {/* Secondary Ambient Glow */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600 blur-[180px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center space-y-8 px-6"
      >
        <p className="uppercase tracking-[6px] text-xs text-pink-300">
          Private Release
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          A Small Surprise<br />
          Is Waiting For You
        </h1>

        <p className="text-gray-300 max-w-md mx-auto">
          Designed carefully.  
          Built intentionally.  
          Released exclusively.
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/surprise")}
          className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-lg font-semibold shadow-2xl"
        >
          Begin Experience
        </motion.button>
      </motion.div>
    </main>
  );
}
