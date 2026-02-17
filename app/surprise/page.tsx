'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Note = { id: number; x: number; y: number; text: string };
type UsedZones = Record<string, number>;

export default function SurprisePage() {
  const router = useRouter();

  // Defaults (App Router safe)
  const zoneSize = 80;
  const noteDuration = 2500;
  const maxNotes = 200;

  const messages = [
    "You're my favorite notification 💌",
    "My heart chose you 💓",
    "You are my safe place 🫶",
    "Forever isn't enough with you 💍",
    "Every moment with you matters ✨",
    "You make everything better 🌸",
    "My always and forever ❤️",
    "You're my happiest thought ☀️",
    "I love you endlessly 💖",
    "You are my person 🥰",
    "You feel like home 🏡",
    "I’d choose you in every lifetime 🔁",
    "You’re my calm in chaos 🌊",
    "You complete my world 🌍",
    "I smile because of you 😊",
    "You’re my best decision 🫰",
    "My heart is yours 💘",
    "You’re my favorite hello 👋",
    "You’re my sweetest memory 📸",
    "With you, everything feels right 💫",
  ];

  const repeatMessages = [
    "You already tapped this spot. Try somewhere new.",
    "Oh, you did it again? Fine. 10,000 kisses have been added as punishment.",
    "Again? Now you owe me a long kiss for that.",
    "Alright. Your choice. I’m kissing you all day as punishment.",
  ];

  const [notes, setNotes] = useState<Note[]>([]);
  const [usedZones, setUsedZones] = useState<UsedZones>({});
  const [usedMessages, setUsedMessages] = useState<string[]>([]);
  const [redirectTriggered, setRedirectTriggered] = useState(false);

  const nextNoteIdRef = useRef<number>(0);

useEffect(() => {
  nextNoteIdRef.current = Date.now();
}, []);
  const clickLockRef = useRef(false);

  const clampPosition = (x: number, y: number) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const padding = 120;

    return {
      x: Math.min(Math.max(x, padding), w - padding),
      y: Math.min(Math.max(y, padding), h - padding),
    };
  };

  const handlePointer = (clientX: number, clientY: number) => {
    if (clickLockRef.current) return;
    clickLockRef.current = true;
    setTimeout(() => (clickLockRef.current = false), 150);

    const zoneX = Math.floor(clientX / zoneSize);
    const zoneY = Math.floor(clientY / zoneSize);
    const zoneKey = `${zoneX}-${zoneY}`;

    const repeatCount = usedZones[zoneKey] || 0;

    let text: string;

    if (repeatCount === 0) {
      const remainingMessages = messages.filter(
        (m) => !usedMessages.includes(m)
      );

      if (remainingMessages.length === 0) return;

      text =
        remainingMessages[
          Math.floor(Math.random() * remainingMessages.length)
        ];

      setUsedMessages((prev) => [...prev, text]);
    } else {
      text =
        repeatMessages[
          Math.min(repeatCount - 1, repeatMessages.length - 1)
        ];
    }

    setUsedZones((prev) => ({
      ...prev,
      [zoneKey]: repeatCount + 1,
    }));

    const { x, y } = clampPosition(clientX, clientY);

    const newNote = {
      id: nextNoteIdRef.current++,
      x,
      y,
      text,
    };

    setNotes((prev) => [...prev, newNote].slice(-maxNotes));

    setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== newNote.id));
    }, noteDuration);

    if (
      usedMessages.length + (repeatCount === 0 ? 1 : 0) ===
        messages.length &&
      !redirectTriggered
    ) {
      setRedirectTriggered(true);
      setTimeout(() => router.push("/finale"), 1500);
    }
  };

  return (
    <div
      onPointerDown={(e) => handlePointer(e.clientX, e.clientY)}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-300 to-rose-200 cursor-pointer select-none"
    >
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{
              position: "absolute",
              left: note.x,
              top: note.y,
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none bg-white/95 px-4 py-2 rounded-2xl shadow-xl text-sm text-pink-700 max-w-xs"
          >
            {note.text}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute top-4 right-4 bg-white/80 text-pink-700 px-3 py-1 rounded-full text-sm shadow">
        {usedMessages.length}/{messages.length}
      </div>
    </div>
  );
}
