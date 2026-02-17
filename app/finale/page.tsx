"use client";

import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { useState } from "react";

export default function FinalePage() {
  const [generating, setGenerating] = useState(false);

  const generateCertificate = () => {
    setGenerating(true);

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    // Background
    doc.setFillColor(248, 240, 220);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Double Border
    doc.setDrawColor(120, 90, 40);
    doc.setLineWidth(3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setLineWidth(0.8);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.setTextColor(102, 51, 0);
    doc.text("OFFICIAL OWNERSHIP CERTIFICATE", centerX, 50, {
      align: "center",
    });

    doc.line(40, 60, pageWidth - 40, 60);

    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(60);
    doc.text("This certifies that", centerX, 80, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.setTextColor(120, 30, 60);
    doc.text("Thawe Su Kyar Myint", centerX, 100, {
      align: "center",
    });

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.setTextColor(50);

    const body = [
      "Has officially unlocked Permanent Affection Mode",
      "",
      "Including:",
      "• Unlimited kisses",
      "• Lifetime teasing privileges",
      "• Priority cuddle access",
      "",
      "No expiration. No transfers. No refunds."
    ];

    doc.text(body, centerX, 125, {
      align: "center",
      lineHeightFactor: 1.8,
      maxWidth: 140,
    });

    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(
      `Issued on ${new Date().toDateString()}`,
      centerX,
      pageHeight - 30,
      { align: "center" }
    );

    setTimeout(() => {
      doc.save("Luxury_Love_Certificate.pdf");
      setGenerating(false);
    }, 800);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* Deep Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f1c2c] via-[#2c1e3e] to-[#3a0f2e]" />

      {/* Subtle Gold Glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500 blur-[200px] opacity-10" />

      {/* Floating Soft Light */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-pink-600 blur-[180px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-16 text-center max-w-2xl shadow-2xl"
      >
        <p className="uppercase tracking-[6px] text-xs text-pink-300 mb-6">
          Final Release
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Officially Claimed 💍
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed mb-10">
          Your affection has been reviewed, approved,
          and permanently registered.
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateCertificate}
          className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-lg font-semibold shadow-xl"
        >
          {generating ? "Preparing Certificate..." : "Download Official Certificate"}
        </motion.button>
      </motion.div>
    </main>
  );
}
