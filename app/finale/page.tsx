"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import confetti from "canvas-confetti";

export default function FinalePage() {
  const [showModal, setShowModal] = useState(false);
  const [teaseIndex, setTeaseIndex] = useState(0);
  const [generating, setGenerating] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const teasingLines = [
    "Oh you thought it was over?",
    "Nope.",
    "You’re stuck with me now.",
    "Forever mode activated 💕",
  ];

  // 🎵 Fade In Audio
  const fadeInAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play().catch(() => {});

    let volume = 0;
    const fade = setInterval(() => {
      if (volume < 0.6) {
        volume += 0.05;
        audio.volume = volume;
      } else {
        clearInterval(fade);
      }
    }, 200);
  };

  // 🎵 Fade Out Audio
  const fadeOutAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    let volume = audio.volume;

    const fade = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        audio.volume = volume;
      } else {
        clearInterval(fade);
        audio.pause();
        audio.currentTime = 0;
      }
    }, 200);
  };

  // Fade out when page unmounts
  useEffect(() => {
    return () => {
      fadeOutAudio();
    };
  }, []);

  const handleMainClick = () => {
    fadeInAudio();

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
    });

    setShowModal(true);
  };

  const handleDownload = () => {
    setGenerating(true);

    setTimeout(() => {
      window.location.href = "/api/certificate";
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center animate-bg bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500">

      {/* Floating Emojis */}
      <Floating emoji="💖" className="top-20 left-16" />
      <Floating emoji="✨" className="top-40 right-20" delay={1} />
      <Floating emoji="💘" className="bottom-24 left-24" delay={2} />
      <Floating emoji="🌸" className="bottom-32 right-16" delay={1.5} />

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md text-center"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient"
        >
          You unlocked my final level.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/90 text-lg mb-6"
        >
          I don't kiss gently.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMainClick}
          className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          Come here.
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm"
            >
              <h2 className="text-2xl font-bold text-pink-500 mb-4">
                Too late 😌
              </h2>

              <motion.p
                key={teaseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-700 mb-4"
              >
                {teasingLines[teaseIndex]}
              </motion.p>

              <button
                onClick={() =>
                  setTeaseIndex((prev) =>
                    prev < teasingLines.length - 1 ? prev + 1 : 0
                  )
                }
                className="text-sm text-pink-500 mb-4"
              >
                Next 😏
              </button>

              <button
                onClick={() => {
                  fadeOutAudio();
                  setShowModal(false);
                }}
                className="block w-full bg-pink-500 text-white px-6 py-2 rounded-full mb-3"
              >
                Accept fate 💕
              </button>

              <button
                onClick={handleDownload}
                className="inline-block bg-pink-100 text-pink-600 px-6 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
              >
                {generating
                  ? "Generating certificate..."
                  : "Download Ownership Certificate 📜"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio */}
      <audio
        ref={audioRef}
        src="/music/from-the-start.mp3"
        loop
      />
    </div>
  );
}

function Floating({
  emoji,
  className,
  delay = 0,
}: {
  emoji: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        repeat: Infinity,
        duration: 4,
        delay,
      }}
      className={`absolute text-4xl opacity-70 ${className}`}
    >
      {emoji}
    </motion.div>
  );
}
