// utils/PdfComparator.js
import fs from 'fs';
import pdfParse from 'pdf-parse';

export class PdfComparator {
  // Extract text content from a PDF file
  static async extractText(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  // Compare two PDF files for text content equality
  static async compare(filePath1, filePath2) {
    const text1 = await PdfComparator.extractText(filePath1);
    const text2 = await PdfComparator.extractText(filePath2);
    return text1 === text2;
  }

  // Compare two PDF files and return the diff (lines that differ)
  static async diff(filePath1, filePath2) {
    const text1 = (await PdfComparator.extractText(filePath1)).split('\n');
    const text2 = (await PdfComparator.extractText(filePath2)).split('\n');
    const maxLen = Math.max(text1.length, text2.length);
    const diffs = [];
    for (let i = 0; i < maxLen; i++) {
      if ((text1[i] || '').trim() !== (text2[i] || '').trim()) {
        diffs.push({ line: i + 1, file1: text1[i] || '', file2: text2[i] || '' });
      }
    }
    return diffs;
  }
}
