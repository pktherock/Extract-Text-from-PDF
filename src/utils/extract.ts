import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = 'static/pdf.worker.js';
export default async function extractTextFromPDF(pdfBuffer: any) {
  const loadingTask = pdfjs.getDocument({ data: pdfBuffer });
  const pdfDocument = await loadingTask.promise;

  let textContent = '';

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const pageText = await page.getTextContent();
    pageText.items.forEach((item: any) => {
      textContent += item.str + ' ';
    });
  }

  return textContent;
}
