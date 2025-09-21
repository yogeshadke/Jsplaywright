// utils/dataProvider.js
import fs from 'fs';
import path from 'path';
import { ExcelHandler } from './ExcelHandler.js';

export class DataProvider {
  // Read data from a JSON file
  static fromJSON(filePath) {
    const absPath = path.resolve(filePath);
    if (!fs.existsSync(absPath)) throw new Error(`JSON file not found: ${filePath}`);
    return JSON.parse(fs.readFileSync(absPath, 'utf-8'));
  }

  // Read data from an Excel file
  static fromExcel(filePath, sheetName = null) {
    return ExcelHandler.readExcel(filePath, sheetName);
  }
}
