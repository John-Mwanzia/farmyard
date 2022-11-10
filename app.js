const express = require("express");
const app = express()
app.use(express.static("public" ))
app.get("/", function(req, res){
    res.sendFile((__dirname + "/index.html"));
});

app.post("/", function(req, res){
    const fName = req.body.firstname
    const lName = req.body.lastname
    const email = req.body.email
    const county = req.body.county
    const message= req.body.subject

    console.log(fName);
})


app.listen(3000, function(){
    console.log("server started on port 3000");
})