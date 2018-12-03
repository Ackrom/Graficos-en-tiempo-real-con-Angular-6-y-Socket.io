let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bdf = require('./models/BaseDataFaker').baseDataFaker;
let cdf = require("./libs/CurrencyData.factory")(bdf);

setInterval(() => {
  io.emit("message",cdf.getCurrencyData());
  
  io.emit("USD",cdf.getACurrency('USD'));
  io.emit("EUR",cdf.getACurrency('EUR'));
  io.emit("GBP",cdf.getACurrency('GBP'));
  io.emit("CHF",cdf.getACurrency('CHF'));
  io.emit("CAD",cdf.getACurrency('CAD'));
  io.emit("AUD",cdf.getACurrency('AUD'));
  io.emit("NZD",cdf.getACurrency('NZD'));
}, 5000);

http.listen(5000,()=>{
  console.log('started on port 5000');
})
