var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var Main = require("./Poker/PokerMainProcess");
app.use(bodyParser.json());                                                 // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.listen(process.env.PORT || 8001);

app.get("/", function(request, response){
    response.sendFile(__dirname+"/client/index.html");
});
app.get('/:filename', function (request, response) {
    var filename = request.params.filename;
    if(filename=="randomHand")
        response.sendFile(__dirname+"/client/randomHand.html");
    else if(filename=="manualHand")
        response.sendFile(__dirname+"/client/manualHand.html");
    else if(filename=="playerActionSimulation")
        response.send("Coming soon...");
    else
        response.sendFile(__dirname+"/client/"+filename);
});
app.post('/Assignment', function (request, response) {
    var result = Main(request.body);
    response.send(JSON.stringify(result));
});
app.get('/images/:filename', function (request, response) {
    var filename = request.params.filename;
    response.sendFile(__dirname+"/client/images/"+filename);
});
