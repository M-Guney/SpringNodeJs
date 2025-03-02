require('dotenv').config();

const config = {
  "PORT": process.env.PORT || 3000,
  "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
  "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/project_base_ytb"
};

console.log('--> Yüklenen CONNECTION_STRING :   ', config.CONNECTION_STRING);

module.exports = config;
