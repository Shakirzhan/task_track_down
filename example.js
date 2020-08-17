var express = require('express');

var app = express();

var request = require('request');

var cheerio = require("cheerio");

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
   
  res.render('list');
    
})

app.get('/:barcode', function(req, res) {
   
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  //EJ000385249RU
  //req.params.barcode

  var url = 'https://www.pochta.ru/tracking?'

  var qs = { 
    p_p_id: 'trackingPortlet_WAR_portalportlet', 
    p_p_lifecycle: '2',
    p_p_state: 'normal',
    p_p_mode: 'view',
    p_p_resource_id: 'getList',
    p_p_cacheability: 'cacheLevelPage',
    p_p_col_id: 'column-1',
    p_p_col_pos: '1',
    p_p_col_count: '2',
    barcodeList: req.params.barcode
  };

  request({url, qs}, function(err, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  });



})

app.listen(3001);