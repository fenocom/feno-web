import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
  const { html } = await req.json();

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page {
            size: A4;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .page {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            position: relative;
          }
        </style>
      </head>

      <body>
        <div class="page">
          ${html}
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(fullHtml, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    printBackground: true,
    format: "A4",
    preferCSSPageSize: true,
  });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    },
  });
}
