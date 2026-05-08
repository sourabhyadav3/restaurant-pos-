/**
 * Universal Print Utility
 * Extracts printable content and prints it in a clean iframe
 * to avoid any dashboard/UI bleeding into the print output.
 */
let isPrinting = false;

export const printContent = (elementId = 'printable-area') => {
  if (isPrinting) {
    console.warn('[PrintUtil] Print already in progress, ignoring request.');
    return;
  }
  isPrinting = true;

  const source = document.getElementById(elementId) 
    || document.querySelector(`.${elementId}`)
    || document.querySelector('.printable-area')
    || document.querySelector('.print-section');

  if (!source) {
    console.warn('[PrintUtil] No printable element found for:', elementId);
    window.print(); // fallback
    isPrinting = false;
    return;
  }

  // Create a hidden iframe for clean, isolated printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '-10000px';
  iframe.style.left = '-10000px';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;

  // Build a clean HTML document with only the receipt/report
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Print</title>
      <style>
        @page { margin: 8mm; size: auto; }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Courier New', Courier, monospace;
          color: #000;
          background: #fff;
          padding: 0;
          margin: 0;
        }

        /* ===== Receipt Styles ===== */
        .receipt-print {
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          font-family: 'Courier New', Courier, monospace;
        }

        /* ===== Report / Full-Page Styles ===== */
        .printable-area, .print-section, #printable-area {
          width: 100%;
          padding: 15mm;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* ===== Typography ===== */
        h1 { font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
        h2 { font-size: 18px; font-weight: 900; text-transform: uppercase; }
        h3 { font-size: 15px; font-weight: 800; }
        p, span, td, th { font-size: 11px; }

        /* ===== Tables ===== */
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 6px 4px; text-align: left; border-bottom: 1px solid #ddd; font-size: 11px; }
        thead tr { border-bottom: 2px solid #222; }
        tfoot tr { border-top: 2px solid #222; }

        /* ===== Grid layouts for reports ===== */
        .grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .grid > * { flex: 1; min-width: 45%; }

        /* ===== Dividers ===== */
        .border-b, .border-t, .border-y { border-color: #ccc; }
        .border-b-2 { border-bottom: 2px solid #222; }
        .border-t-2 { border-top: 2px solid #222; }

        /* ===== Spacing ===== */
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .mb-12 { margin-bottom: 48px; }
        .mt-1 { margin-top: 4px; }
        .mt-2 { margin-top: 8px; }
        .pt-2 { padding-top: 8px; }
        .pt-4 { padding-top: 16px; }
        .pt-8 { padding-top: 32px; }
        .pb-4 { padding-bottom: 16px; }
        .pb-8 { padding-bottom: 32px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .py-2 { padding-top: 8px; padding-bottom: 8px; }
        .py-3 { padding-top: 12px; padding-bottom: 12px; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
        .py-6 { padding-top: 24px; padding-bottom: 24px; }
        .px-2 { padding-left: 8px; padding-right: 8px; }

        /* ===== Flex helpers ===== */
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .items-end { align-items: flex-end; }
        .flex-col { flex-direction: column; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .gap-8 { gap: 32px; }
        .gap-12 { gap: 48px; }

        /* ===== Text ===== */
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-black { font-weight: 900; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .tracking-tight { letter-spacing: -0.02em; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .tracking-widest { letter-spacing: 0.1em; }
        .leading-relaxed { line-height: 1.7; }

        .text-xs { font-size: 10px; }
        .text-sm { font-size: 12px; }
        .text-base { font-size: 14px; }
        .text-lg { font-size: 16px; }
        .text-xl { font-size: 18px; }
        .text-2xl { font-size: 22px; }
        .text-3xl { font-size: 28px; }
        .text-\\[8px\\] { font-size: 8px; }
        .text-\\[9px\\] { font-size: 9px; }
        .text-\\[10px\\] { font-size: 10px; }
        .text-\\[11px\\] { font-size: 11px; }
        .text-\\[12px\\] { font-size: 12px; }

        /* ===== Colors ===== */
        .text-slate-400, .text-slate-500 { color: #666; }
        .text-slate-900 { color: #111; }

        /* ===== Layout ===== */
        .w-full { width: 100%; }
        .w-32 { width: 128px; }
        .h-12 { height: 48px; }
        .space-y-1 > * + * { margin-top: 4px; }
        .space-y-2 > * + * { margin-top: 8px; }
        .space-y-3 > * + * { margin-top: 12px; }
        .space-y-4 > * + * { margin-top: 16px; }
        .divide-y > * + * { border-top: 1px solid #eee; }

        /* ===== Grid ===== */
        .grid-cols-2 { display: grid; grid-template-columns: 1fr 1fr; }

        /* ===== Borders ===== */
        .border-b { border-bottom: 1px solid #ddd; }
        .border-t { border-top: 1px solid #ddd; }
        .border-y { border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }
        .border-slate-100 { border-color: #eee; }
        .border-slate-300 { border-color: #ccc; }
        .border-slate-900 { border-color: #222; }

        /* ===== Decorative (folio signature box) ===== */
        .bg-slate-50 { background: #f8f8f8; }
        .rounded-xl { border-radius: 8px; }
        .p-4 { padding: 16px; }

        .folio-page { 
          page-break-after: always; 
          padding: 20px; 
          border-bottom: 2px dashed #eee; 
          margin-bottom: 40px; 
        }
        .folio-page:last-child { 
          page-break-after: avoid;
          border-bottom: none; 
        }

        /* ===== QR Label Styles ===== */
        .qr-label-print {
          width: 100mm;
          height: 150mm;
          margin: 0 auto;
          background: #fff;
          border: 8px solid #111;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          position: relative;
        }

        .qr-image-container {
          padding: 20px;
          border: 4px solid #111;
          border-radius: 40px;
          background: #fff;
        }

        .qr-image {
          width: 180px;
          height: 180px;
        }

        .scan-badge {
          background: #111;
          color: #fff;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* ===== Misc ===== */
        .pr-8 { padding-right: 32px; }
        .hidden-print { display: none !important; }
        img, svg { max-width: 100%; }
      </style>
    </head>
    <body>
      ${source.innerHTML}
    </body>
    </html>
  `);
  doc.close();

  // Flag to prevent double printing
  let hasPrinted = false;

  const triggerPrint = () => {
    if (hasPrinted) return;
    hasPrinted = true;
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {
      console.error('[PrintUtil] Print failed:', e);
    }
    
    // Clean up after printing
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      isPrinting = false;
    }, 1000);
  };

  // Set up after print cleanup on the iframe window too
  iframe.contentWindow.onafterprint = () => {
    isPrinting = false;
  };

  // Primary: Wait for the iframe content to render, then print
  iframe.onload = () => {
    setTimeout(triggerPrint, 250);
  };

  // Fallback: if onload doesn't fire (some browsers)
  setTimeout(triggerPrint, 1500);
};

export default printContent;
