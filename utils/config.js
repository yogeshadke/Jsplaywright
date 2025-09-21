// utils/config.js
import fs from 'fs';
import path from 'path';

export class Config {
  static config = null;

  static loadConfig(env = process.env.TEST_ENV || 'qa') {
    const configPath = path.join('config', `${env}.config.js`);
    if (fs.existsSync(configPath)) {
      Config.config = require(path.resolve(configPath));
    } else {
      throw new Error(`Config file not found: ${configPath}`);
    }
    return Config.config;
  }

  static get(key, defaultValue = undefined) {
    if (!Config.config) Config.loadConfig();
    return Config.config[key] !== undefined ? Config.config[key] : defaultValue;
  }
}
