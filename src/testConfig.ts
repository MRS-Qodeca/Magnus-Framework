import dotenv from 'dotenv';
import path from 'path';

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

export const testConfig = {
  baseURL: process.env.BASE_URL || ``,
  qa: process.env.QA_URL || ``,
  dev: process.env.DEV_URL || ``,
  prod: process.env.PROD_URL || ``,

  qaApi: `https://reqres.in`,
  devApi: ``,
  prodApi: ``,

  get username() {
    return process.env.USER_NAME || 'admin';
  },
  get password() {
    return process.env.PASSWORD || 'admin';
  },

  get bypassToken() {
    return process.env.BYPASS_TOKEN || '';
  },

  get waitForElement() {
    return process.env.WAIT_FOR_ELEMENT ? parseInt(process.env.WAIT_FOR_ELEMENT, 10) : 10000;
  },

  get dbUsername() {
    return process.env.DB_USERNAME || '';
  },
  get dbPassword() {
    return process.env.DB_PASSWORD || '';
  },
  dbServerName: process.env.DB_SERVER_NAME || ``,
  dbPort: process.env.DB_PORT || ``,
  dbName: process.env.DB_NAME || ``,
};
