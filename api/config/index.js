require('dotenv').config();

const config = {
  "PORT": process.env.PORT || 3000,
  "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
  "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/project_base_ytb",
  "JWT": {
    "SECRET": "123456",
    "EXPIRE_TIME": !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 24*60*60 //86400 saniye =  bir gun
  }
};

console.log('--> Yüklenen CONNECTION_STRING :   ', config.CONNECTION_STRING);

module.exports = config;
