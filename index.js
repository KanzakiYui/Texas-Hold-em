
var Test = require("./Poker/Assgin_Shuffle_Compare_Test");
var express = require("express");
var app = express();
app.listen(process.env.PORT || 8080);
app.get("/", function(request, response){
    response.sendFile(__dirname+"/index.html");
});
app.get("/PokerTest",function(request, response){
    response.send(Test());
});
