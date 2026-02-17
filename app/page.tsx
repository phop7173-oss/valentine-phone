"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Heart = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
};

export default function HomePage() {
  const router = useRouter();
  const [explode, setExplode] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Generate randomness only on client
  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 18,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 5,
    }));

    setHearts(generated);
  }, []);

  const handleClick = () => {
    setExplode(true);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    setTimeout(() => {
      router.push("/surprise");
    }, 800);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-red-200 flex items-center justify-center">

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music/rewrite-the-stars.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -100, x: `${heart.left}vw`, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-pink-400 pointer-events-none"
          style={{ fontSize: heart.size }}
        >
          💖
        </motion.div>
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-md text-center border border-white/40"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Thawe 💕
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          I built this little universe just for you.
          Every heartbeat, every click… leads to love.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg"
        >
          Will you be my Soulmate? 💌
        </motion.button>
      </motion.div>

      {/* Explosion */}
      <AnimatePresence>
        {explode && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center text-6xl pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            ❤️ 💖 💘 💞 💕
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
