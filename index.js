var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var Main = require("./Poker/PokerMainProcess");
app.use(bodyParser.json());                                                 // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.listen(process.env.PORT || 8001);
app.use(express.static("client"));
app.get("/", function(request, response){
    response.sendFile(__dirname+"/client/index.html");
});
app.get('/:action', function (request, response) {
    var action = request.params.action;
    if(action=="randomHand")
        response.sendFile(__dirname+"/client/randomHand.html");
    else if(action=="manualHand")
        response.sendFile(__dirname+"/client/manualHand.html");
    else if(action=="playerActionSimulation")
        response.send("Coming soon...");
});
app.post('/Assignment', function (request, response) {
    var result = Main(request.body);
    response.send(JSON.stringify(result));
});

app.post('/ManualAssignment', function(request, response){
    var result = Main(null, request.body);
    response.send(JSON.stringify(result));
});

