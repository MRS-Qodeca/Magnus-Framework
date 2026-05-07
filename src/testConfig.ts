import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const testConfig = {
  qa: process.env.QA_URL || `https://magento.softwaretestingboard.com/`,
  dev: process.env.DEV_URL || ``,
  prod: process.env.PROD_URL || ``,

  qaApi: `https://reqres.in`,
  devApi: ``,
  prodApi: ``,

  username: process.env.USER_NAME || `domyslny@email.com`,
  password: process.env.PASSWORD || `domyslneHaslo`,

  waitForElement: process.env.WAIT_FOR_ELEMENT ? parseInt(process.env.WAIT_FOR_ELEMENT) : 10000,

  dbUsername: process.env.DB_USERNAME || ``,
  dbPassword: process.env.DB_PASSWORD || ``,
  dbServerName: process.env.DB_SERVER_NAME || ``,
  dbPort: process.env.DB_PORT || ``,
  dbName: process.env.DB_NAME || ``,
};
