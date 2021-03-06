var HandAssignment = require("./HandAssignment");
var ManualHandAssignment = require("./ManualHandAssignment");
var GetHandRank = require("./GetHandRank");
var HandCompare = require("./HandCompare");
var Combination = require("./Combination");
var Hand = require("./Hand");
const globalSetting = require("./Setting"); 

/*
    This file is main entry of game logic, it will be updated continually.
    Code comments for this file will be done later
*/
function Main(setting = null, customHands = null){      // customHands includes 'communityCards' and 'pocketCardsArray'
    var resultMessage = new Object();
    var handNumber;
    var pocketNumber;
    var communityNumber;
    if(setting == null)
        setting = globalSetting
    if(customHands == null){
        handNumber = setting.playerNumbers;
        var shuffleTimes = setting.minmumShuffleTimes;
        pocketNumber = setting.poketCardsNumber;
        communityNumber = setting.communityCardsNumber;
        var assignmentResult = HandAssignment(handNumber, shuffleTimes, pocketNumber, communityNumber);
        resultMessage["assignResult"] = assignmentResult.show(); 
    }
    else{
        var communityCards = customHands["communityCards"];
        var pocketCardsArray = customHands["pocketCardsArray"];
        handNumber = pocketCardsArray.length;
        pocketNumber = pocketCardsArray[0].length;      // We assume all players have the same number of pocket cards
        communityNumber = communityCards.length;
        var assignmentResult = ManualHandAssignment(communityCards, pocketCardsArray);
        resultMessage["assignResult"] = assignmentResult.show(); 
    }                   
    var playersAllPossibleCombinations = new Array(handNumber);                   
    var playersAllPossibleHands = new Array(handNumber);
    for(var i=0; i<handNumber;i++){
        playersAllPossibleCombinations[i] = GetAllPossibleHand(assignmentResult['Hand'+(i+1)], assignmentResult['Community']);
        // we generate each combination (5 cards) into a new hand
        playersAllPossibleHands[i] = new Array();
        for(var j=0; j<playersAllPossibleCombinations[i].length; j++){
            var newhand = new Hand();
            for(var k=0;k<5;k++)
                newhand.Add(playersAllPossibleCombinations[i][j][k]);
            playersAllPossibleHands[i].push(newhand);
        }
    }
    // Now firstly we need select best hand of all possible hands for a player
    var bestHandOfPlayers = new Array(handNumber);
    resultMessage["bestHandsInfo"] = new Object();
    for(var i=0; i<handNumber; i++){
        var bestHand = playersAllPossibleHands[i][0];
        for(var j=1; j<playersAllPossibleHands[i].length; j++){
            if(HandCompare(bestHand, playersAllPossibleHands[i][j]).winner == "Right")
                bestHand = playersAllPossibleHands[i][j];
        }
        resultMessage["bestHandsInfo"][i+1] = new Object();
        bestHand = GetHandRank(bestHand).sortedHand;
        resultMessage["bestHandsInfo"][i+1]['besthand'] = bestHand.GetSuitAndRank();
        resultMessage["bestHandsInfo"][i+1]['bestrank'] = GetHandRank(bestHand).result;
        bestHandOfPlayers[i]=bestHand;
    }
    // Finally, we compare the best hands of all players to determine the winner
    var winnerHand = bestHandOfPlayers[0];
    var winnerId = 1;
    for(var i=1; i<handNumber; i++){
        if(HandCompare(winnerHand, bestHandOfPlayers[i]).winner == "Right"){
            winnerHand = bestHandOfPlayers[i];
            winnerId = (i+1);
        }
    }
    /**
    * Fristly, we get (one of) the winner, now we need to check if there are duplicate 
    * winner (for example, there may be 2 winners of total 3 players)
    */
    var winnersArray = [winnerId];           // already find one
    for(var i=0; i<handNumber; i++){
        if((i+1)!=winnerId&&HandCompare(winnerHand, bestHandOfPlayers[i]).isTie == true)
            winnersArray.push(i+1);
    }
    resultMessage["result"] = ""
    if(winnersArray.length > 1){     // multiple winners
        resultMessage["result"] ="Multiple winners occur! They are:\n";
        for(var i=0; i<winnersArray.length;i++)
            resultMessage["result"] += "Player "+(winnersArray[i])+"\n"
    }
    else{
        resultMessage["result"] ="The winner is ----- Player "+winnerId+" --------\n";
    }
    return resultMessage;
}

function GetAllPossibleHand(pocketCards, communityCards){
    var allCardsAvailableForPlayer = pocketCards.concat(communityCards);
    var allPossibleCombination = Combination(allCardsAvailableForPlayer, 5);
    // note 5 is hard-coded because it's the principle game rule when we compare hand
    return allPossibleCombination;
}

module.exports = Main;
/* -------------   The following are for test only --------------  */
//var resultMessage = Main();
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
    ],
    [
        {"suit": "Sapde", "rank": 5}, {"suit": "Club", "rank": 14}, {"suit": "Club", "rank": 10}
    ]
];
var customHands = {"communityCards": communityCards, "pocketCardsArray": pocketCardsArray};
var resultMessage = Main(null, customHands);
for (var key in resultMessage["assignResult"])
console.log(resultMessage["assignResult"][key])
for (var key in resultMessage["bestHandsInfo"])
for (var subkey in resultMessage["bestHandsInfo"][key])
    console.log(resultMessage["bestHandsInfo"][key][subkey])
console.log(resultMessage["result"]);
*/