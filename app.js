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
          //error page
          res.sendFile(__dirname + "/failure.html");
        } else {
          console.log('Email sent: ' + info.response);
          //success page
        res.sendFile(__dirname + "/success.html");
        }
      });

  

})

//redirect to homepage after submitting request succsess

app.post("/success", function(req,res){
  res.redirect("/");
});


// redirect to homepage and specific to the contact section after any error
app.post("/failure", function(req,res){
  res.redirect("/#contact");
});

app.listen(3000, function(){
    console.log("server started on port 3000");
})