'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-pink-200 to-red-300 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-md text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello Love 💖
        </h1>

        <p className="text-gray-600 mb-8">
          I prepared something special for you.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/surprise')}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-xl"
        >
          Open Surprise 💌
        </motion.button>
      </motion.div>
    </main>
  )
}
