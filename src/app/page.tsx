'use client';
import extractTextFromPDF from '@/utils/extract';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState<string>('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const pdfBuffer = await readFileAsBuffer(selectedFile);
      console.log('PDF Array Buffer', pdfBuffer);
      await getTextFromPdf(pdfBuffer);
      alert('PDF uploaded successfully!');
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  const readFileAsBuffer = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const buffer = event.target.result;
        resolve(buffer);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const getTextFromPdf = async (pdfBuffer: any) => {
    const formData = new FormData();
    formData.append('pdf', new Blob([pdfBuffer], { type: 'application/pdf' }));

    const result = await extractTextFromPDF(pdfBuffer); // in client side
    console.log(result);

    setExtractedText(result);

    try {
      const res = await fetch('api/extractPdf', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Extract Text from PDF</h1>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Get Text from PDF</button>
      <p>{extractedText}</p>
    </main>
  );
}
