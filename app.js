require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const alert = require('alert'); 
const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public" ));
app.get("/", function(req, res){
    res.sendFile((__dirname + "/index.html"));
});

app.post("/", function(req, res){
    const fName = req.body.firstname;
    const lName = req.body.lastname;
    const email = req.body.email;
    const subject = req.body.subject;
    const message= req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: email,
        to: 'smartfarmyard838@gmail.com',
        subject: subject,
        // text: "Message: " +  message ,
        html: "From : "+ fName+"<br> "+ "Email : " + email + " <br>" + "Message : " +  message

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        res.send( "<h1>hello</h1>" + " " + fName + " " + lName +  " " + "<h1>Your request submitted successfuly</h1>")
        }
      });

  

})


app.listen(3000, function(){
    console.log("server started on port 3000");
})