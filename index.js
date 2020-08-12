var express = require('express');
var soap = require('strong-soap').soap;



// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
var url = 'https://tracking.russianpost.ru/rtm34?wsdl';

var requestArgs = {
  symbol: 'IBM'
};

var options = {
    'trace': 1,
    'soap_version': 2
  };


var app = express();

app.set('view engine', 'ejs');

app.get('/:barcode', function(req, res) {
   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    //EJ000385249RU
    if(req.params.barcode) {
        soap.createClient(url, options, function(err, client) {
            client.getOperationHistory({
                OperationHistoryRequest: { Barcode: req.params.barcode, MessageType: '0',Language: 'RUS' },
                AuthorizationHeader: { login: 'ptKXgCyjzWMInE',password: 'KOgUrtw94459'}
            }).then(response => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(JSON.stringify(response.result.OperationHistoryData)));
            });
        });
    }

})

app.listen(3000);