// utils/Logger.js
import fs from 'fs';
import path from 'path';

export class Logger {
  static logFile = path.join('utils', 'logs', `test-log-${new Date().toISOString().slice(0,10)}.log`);

  static log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(Logger.logFile, entry);
    console.log(entry.trim());
  }

  static error(message) {
    const entry = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFileSync(Logger.logFile, entry);
    console.error(entry.trim());
  }
}
