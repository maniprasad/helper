
var express  = require("express");        
var app   = express();     // define our app using express
var fs  = require('fs');
// var path = require('path');
// var session = require('express-session')
console.log(process.env.PORT);
var bodyParser = require('body-parser');
var http = require('http');
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
var port = process.env.PORT || 8080; app.listen(port);
app.post('/api/controlCreation' , function(req , res){
// data = JSON.stringify(req.body);
 console.log(req.body);
try {

if(req.body !== 'undefined'){
   const path = "assets/"+req.body.pagename+'.json';
    var createStream = fs.createWriteStream(path);
     const list = res.body;
    createStream.write(data);
    createStream.end();
    const result = {status : 'successful create the file'}
    res.send(result);
} }
catch(err) {
      res.send('file not created');
      res.send(err);
    }

});
app.post('/api/getpageDetails', function(req , res){

 const dataset = JSON.stringify(req.body);
 // console.log(dataset['pagename']);
  const path = "assets/"+req.body.pagename+'.json';
  try {
    if (fs.existsSync(path)) {
      console.log('exist');
     // fs.readFile(req.body.pagename, function(err, data){ 
    const datalist =   fs.readFileSync(path, {encoding:'utf8', flag:'r'}); 
      console.log(datalist); 
      res.send(datalist);
   // });
    }
    else{
      res.send('not Exist');
    }
  }catch(err) {
    console.log('NO exist');
    console.error(err)
    res.send(err);
  }

 
});

