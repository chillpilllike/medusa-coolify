const dotenv = require('dotenv')

 let ENV_FILE_NAME = '';
 switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
 }

 try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
 } catch (e) {
  //handle error
 }

const DB_USERNAME = process.env.DB_USERNAME || "postgres"
const DB_PASSWORD = process.env.DB_PASSWORD || ""
const workerId = parseInt(process.env.JEST_WORKER_ID || "1")

module.exports = {
  plugins: [],
  projectConfig: {
    redis_url: process.env.REDIS_URL,
    database_url: `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost/medusa-integration-${workerId}`,
    database_type: "postgres",
    jwt_secret: "test",
    cookie_secret: "test",
  },
}
