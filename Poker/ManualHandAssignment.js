var Card = require("./Card");

/**
 * ManualHandAssignment function is used only when we need manual test at front-end (automation test?). In this case, the implementation of it (especially initial params) really depends on how clent side sends data to the server
 * @param {JSON[]} communityCards - Array of JSON formatted objects, each JSON object is {suit: ..., rank: ...}
 * @param {JSON[][]} pocketCardsArray - Two-dimension array of JSON formatted objects. Each JSON object is {suit: ..., rank: ...}, each one-dimension array is pocket cards of each player
 * @return {object} The assignment result consists of each player's pockets cards and all community cards. It also provides a shorthand function to show such infomation.
 */
function ManualHandAssignment(communityCards, pocketCardsArray){
    var assignmentResult = new Object();
    var playerNumber = pocketCardsArray.length;
    assignmentResult['Community'] = new Array();
    for(var i=0; i<communityCards.length;i++){
        var newCard = new Card(communityCards[i]["suit"], communityCards[i]["rank"]);
        assignmentResult['Community'].push(newCard);
    }
    for(var i=0;i<playerNumber;i++){
        assignmentResult['Hand'+(i+1)] = new Array();
        var pocketCardsNumber = pocketCardsArray[i].length;
        for(j=0;j<pocketCardsNumber;j++){
            var newCard = new Card(pocketCardsArray[i][j]["suit"], pocketCardsArray[i][j]["rank"]);
            assignmentResult['Hand'+(i+1)].push(newCard);
        }
    }
    assignmentResult.show=function(){
        var message = new Object();
        for(var i=0;i<playerNumber;i++){
            var hand = assignmentResult['Hand'+(i+1)];
            var eachMessage = "";
            for(var j=0; j<hand.length; j++)
                eachMessage += hand[j].GetSuitAndRank()+"\t\t";
            message[i+1] = eachMessage;
        }
        var community = assignmentResult['Community'];
        var eachMessage = ""
        for(var i=0;i<community.length;i++)
            eachMessage += community[i].GetSuitAndRank()+"\t\t";
        message['Community'] = eachMessage;
        return message;
    }
    return assignmentResult;
}

/**
 * ManualHandAssignment module is exported as function dealing cards based on manually defined cards.
 * @module ManualHandAssignment
 * @type {function}
 */
module.exports = ManualHandAssignment;
/* -------------   The following are for test only --------------  */
/*
var communityCards = [
    {"suit": "Spade", "rank": 10}, {"suit": "Spade", "rank": 5}, {"suit": "Club", "rank": 4},
    {"suit": "Heart", "rank": 13}, {"suit": "Diamond", "rank": 10}, {"suit": "Club", "rank": 3}
];
var pocketCardsArray = [
    [
        {"suit": "Spade", "rank": 4}, {"suit": "Club", "rank": 13}, {"suit": "Diamond", "rank": 2}
    ],
    [
        {"suit": "Heart", "rank": 9}, {"suit": "Club", "rank": 14}, {"suit": "Spade", "rank": 5}
    ],
    [
        {"suit": "Diamond", "rank": 6}, {"suit": "Spade", "rank": 7}, {"suit": "Club", "rank": 12}
    ]
];
var assign = ManualHandAssignment(communityCards, pocketCardsArray);
var show = assign.show();
for(var key in show)
    console.log(key, show[key]);
*/