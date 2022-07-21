const express = require("express");
const  request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use('/files',express.static('files'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const fisrtName  = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(fisrtName + " " + lastName + " " + email);
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fisrtName,
                    LNAME: lastName

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/3df44a6ee2";
    const option = {
        method: "POST",
        auth: "aneja:59ba7a9359c57ff67d7823c0cb1c167a-us14"

    }

    if(response.statusCode === 200){
        res.send("Successfully subscribed!");
    } else{
        res.send("there was an error with signing up, please try again!");
    }

    const request = https.request(url, option, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});
// 59ba7a9359c57ff67d7823c0cb1c167a-us14
// 3df44a6ee2
// web link is   https://guarded-mountain-54077.herokuapp.com/