// import required packages and create new express app 
const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3002
;

// we will give our information from google to app

var auth = {
    type: 'oauth2',
    user: 'YOUR_GMAIL_ADDRESS',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
};

// set app to use proper methods to parse our data.

app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

// lett AJAX calls on our express app, we need to allow CORS requests.

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//write send POST method through express. setup right transporter from nodemailer and send mail through it.

  app.post('/send', function(req, res){
    response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
    
    
    var mailOptions = {
        from: req.body.name,
        to: 'tanmaya.rath555@gmail.com',
        subject: 'My site contact from: ' + req.body.name,
        text: req.body.message,
        html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });
  transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
  })
  
  // start the server

  app.listen(port);

//at last test it with the POSTMAN
// select POST as method, x-www-form-urlencoded for Body, put address http://localhost:3002/send, add name, email and message as (key, value) pairs and click Send.
