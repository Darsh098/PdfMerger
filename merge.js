import multer from 'multer';
import path from 'path';
const upload = multer({ dest: 'uploads/' });

const mergePDF = async (p1, p2) => {
  // Import pdf-merger-js using dynamic import
  const { default: PDFMerger } = await import('pdf-merger-js');
  const merger = new PDFMerger();

  await merger.add(p1);
  await merger.add(p2);
  let pdfName = new Date().getTime()
  await merger.save(`public/${pdfName}.pdf`);
  return pdfName;

  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // await fs.promises.writeFile('public/merged.pdf', mergedPdfBuffer);
};

export default mergePDF;
// export{mergePdfs}