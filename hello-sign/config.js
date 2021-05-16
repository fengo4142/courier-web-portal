require('dotenv').config();
const config = {
  clientId: process.env.CLIENT_ID,
  key: process.env.API_KEY,
  testMode: process.env.TEST_MODE,
  role: process.env.ROLE
};

console.log(config);

module.exports = config;
