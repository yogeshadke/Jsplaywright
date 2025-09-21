// utils/ExcelHandler.js
// Utility for reading and writing Excel files using 'xlsx' package
import * as XLSX from 'xlsx';
import fs from 'fs';

export class ExcelHandler {
  // Read data from an Excel file and return as JSON
  static readExcel(filePath, sheetName = null) {
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheet];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  // Write JSON data to an Excel file
  static writeExcel(filePath, data, sheetName = 'Sheet1') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, filePath);
  }

  // Check if file exists
  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }
}
