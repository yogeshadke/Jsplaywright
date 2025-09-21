// utils/appConfig.js
import fs from 'fs';
import path from 'path';

export class AppConfig {
  static getAppConfig(appName) {
    const configPath = path.resolve('config/applications.json');
    if (!fs.existsSync(configPath)) throw new Error('applications.json not found');
    const allConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (!allConfig[appName]) throw new Error(`No config found for app: ${appName}`);
    return allConfig[appName];
  }
}
