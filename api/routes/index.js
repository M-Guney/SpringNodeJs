//const { config } = require('dotenv');
var express = require('express');
var router = express.Router();

const fs = require('fs'); // Dosya işlemlerini yapmak icin kullanilir

let routes = fs.readdirSync(__dirname);
// "./" ya da __dirname ile Bulundugun dizin icindeki dosyalari okur

for(let route of routes){
  if(route.includes(".js") && route !== "index.js")// js dosyasi mi peki indexjs degil mi
  {
    router.use("/"+route.replace(".js",""), require("./"+route));// /api/route

  }
}

module.exports = router;
