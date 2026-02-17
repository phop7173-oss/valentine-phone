'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'

export default function FinalePage() {
  const [generating, setGenerating] = useState(false)

  const generateCertificate = () => {
    const doc = new jsPDF()

    // ===== Border =====
    doc.setDrawColor(233, 30, 99)
    doc.setLineWidth(2)
    doc.rect(10, 10, 190, 277)

    // ===== Title =====
    doc.setFontSize(22)
    doc.setTextColor(233, 30, 99)
    doc.text('OFFICIAL OWNERSHIP CERTIFICATE', 105, 35, { align: 'center' })

    // ===== Subtitle =====
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('This certifies that:', 105, 60, { align: 'center' })

    // ===== Name =====
    doc.setFontSize(22)
    doc.setTextColor(173, 20, 87)
    doc.text('Thawe Su Kyar Myint', 105, 75, { align: 'center' })

    // ===== Body =====
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)

    const bodyText = [
      'Has officially unlocked Permanent Affection Mode 💕',
      '',
      'Including:',
      '• Unlimited kisses',
      '• Lifetime teasing privileges',
      '• Priority cuddle access',
      '',
      'This certificate is non-transferable.',
      'No refunds.',
      'Forever binding.',
    ]

    doc.text(bodyText, 105, 105, { align: 'center' })

    // ===== Date =====
    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text(
      `Issued on: ${new Date().toDateString()}`,
      105,
      260,
      { align: 'center' }
    )

    doc.save('Thawe_Su_Kyar_Myint_Certificate.pdf')
  }

  const handleDownload = () => {
    setGenerating(true)

    setTimeout(() => {
      generateCertificate()
      setGenerating(false)
    }, 800)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-pink-200 to-red-300 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-md text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Congratulations 💖
        </h1>

        <p className="text-gray-600 mb-8">
          Your love has officially been verified and certified.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-xl"
        >
          {generating ? 'Generating...' : 'Download Certificate 💌'}
        </motion.button>
      </motion.div>
    </main>
  )
}
