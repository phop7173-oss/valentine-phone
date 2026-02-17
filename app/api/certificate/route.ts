import { NextResponse } from "next/server";

export const runtime = "nodejs"; // VERY IMPORTANT

export async function GET() {
  const PDFDocument = (await import("pdfkit")).default;

  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  // ===== Certificate Content =====

  doc
    .fontSize(28)
    .fillColor("#E91E63")
    .text("OFFICIAL OWNERSHIP CERTIFICATE", {
      align: "center",
    });

  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("black")
    .text("This certifies that:", { align: "center" });

  doc.moveDown(1);

  doc
    .fontSize(24)
    .fillColor("#AD1457")
    .text("Thawe Su Kyar Myint", {
      align: "center",
    });

  doc.moveDown(2);

  doc
    .fontSize(16)
    .fillColor("black")
    .text(
      "Has officially unlocked Permanent Affection Mode 💕\n\nIncluding:\n• Unlimited kisses\n• Lifetime teasing privileges\n• Priority cuddle access\n\nThis certificate is non-transferable.\nNo refunds.\nForever binding.",
      {
        align: "center",
      }
    );

  doc.moveDown(2);

  doc
    .fontSize(12)
    .fillColor("gray")
    .text(`Issued on: ${new Date().toDateString()}`, {
      align: "center",
    });

  doc.end();

  await new Promise<void>((resolve) => {
    doc.on("end", () => resolve());
  });

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=Thawe_Su_Kyar_Myint_Certificate.pdf",
    },
  });
}
