"use client";

import { jsPDF } from "jspdf";

export default function FinalePage() {
  const generateCertificate = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    // ===== Background =====
    doc.setFillColor(248, 240, 220);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // ===== Outer Border =====
    doc.setDrawColor(120, 90, 40);
    doc.setLineWidth(3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // ===== Inner Border =====
    doc.setLineWidth(0.8);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // ===== Watermark =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(60);
    doc.setTextColor(230, 220, 200);
    doc.text("LOVE", centerX, pageHeight / 2, {
      align: "center",
      angle: 45,
    });

    // ===== Title =====
    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.setTextColor(102, 51, 0);
    doc.text("OFFICIAL OWNERSHIP CERTIFICATE", centerX, 50, {
      align: "center",
    });

    // Divider
    doc.setLineWidth(0.5);
    doc.line(40, 60, pageWidth - 40, 60);

    // ===== Subtitle =====
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(60);
    doc.text("This certifies that", centerX, 80, { align: "center" });

    // ===== Name (Main Focus) =====
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.setTextColor(120, 30, 60);
    doc.text("Thawe Su Kyar Myint", centerX, 100, {
      align: "center",
    });

    // ===== Body Text =====
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
      "This certificate is non-transferable.",
      "No refunds.",
      "Forever binding."
    ];

    doc.text(body, centerX, 125, {
      align: "center",
      lineHeightFactor: 1.8,
      maxWidth: 140,
    });

    // ===== Signature Line =====
    doc.setLineWidth(0.5);
    doc.line(centerX - 40, pageHeight - 55, centerX + 40, pageHeight - 55);

    doc.setFontSize(12);
    doc.text("Authorized by: Valentine Authority", centerX, pageHeight - 48, {
      align: "center",
    });

    // ===== Date =====
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(
      `Issued on ${new Date().toDateString()}`,
      centerX,
      pageHeight - 30,
      { align: "center" }
    );

    doc.save("Luxury_Love_Certificate.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-rose-300">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Congratulations 💖</h1>
        <p className="text-gray-600 mb-8">
          Your love has officially been verified and certified.
        </p>
        <button
          onClick={generateCertificate}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Download Luxury Certificate
        </button>
      </div>
    </div>
  );
}
