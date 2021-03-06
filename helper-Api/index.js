
var express  = require("express");        
var app   = express();     // define our app using express
var fs  = require('fs');
var readline = require('readline-sync');  
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

// app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'})); 
var port = process.env.PORT || 8080; app.listen(port);
app.post('/api/controlCreation' , function(req , res){
// data = JSON.stringify(req.body);
 // console.log(req.body);
 try {

if(req.body !== 'undefined'){
   const path = "assets/"+req.body.pagename+'.json';
 var  data = JSON.stringify(req.body);
  let buffer = new Buffer.from(data);
  // open the file in writing mode, adding a callback function where we do the actual writing
  fs.open(path, 'w', function(err, fd) {
      if (err) {
          throw 'could not open file: ' + err;
      }
  
      // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;
          fs.close(fd, function() {
              console.log('wrote the file successfully');
          });
      });
      const result = {status : 'successful create the file'}
            res.send(result);
  });

} 
}
catch(err) {
      res.send('file not created');
      res.send(err);
    }

});
app.post('/api/getpageDetails', function(req , res){
console.log(req.body);
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

