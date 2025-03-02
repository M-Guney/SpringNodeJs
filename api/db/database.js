const mongoose = require('mongoose');
//const config = require('./index');

let instance = null;


class Database{
  constructor(){
    if(!instance){
      this.mongoConnection = null;
      instance = this;
    }
    return instance;
  }
  async connect(options){
        try{
          if (!options.CONNECTION_STRING) {
            throw new Error('MongoDB bağlantı stringi bulunamadı!');
        }
          console.log('Database connecting...');
          let db = await mongoose.connect(options.CONNECTION_STRING )//{useNewUrlParser: true, useUnifiedTopology: true}
          .then(() => console.log('MongoDB Database connected'))
          .catch((err) => console.error('---> MongoDB bağlantı hatası:', err));
          this.mongoConnection = db;
        }catch(err){
          console.error(err);
          process.exit(1);
        }
      }

}
module.exports = Database;