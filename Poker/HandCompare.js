const globalSetting = require("./Setting");
var GetHandRank = require("./GetHandRank");
var Card = require("./Card"); 
var Hand = require("./Hand");      

/**
 * HandCompare function is used to compare two given hands
 * @param {Hand} leftHand - A Hand instance needs to be evaluated
 * @param {Hand} rightHand - A Hand instance needs to be evaluated
 * @return {JSON} An object consists of comparison result consists of all information
 */

 function HandCompare(leftHand, rightHand){
    var handRankings = globalSetting.HandRankings;
    var finalResult ={
        leftHandRank: null,
        leftHandSortedHand: null,
        rightHandRank: null,
        rightHandSortedHand: null,
        winner: null,
        isSameRank: false,
   //     reasonForWinnerInSameRank: null,          // not necessary for us to 'write' the reason for now
        isTie: false
    }
    var leftHandResult = GetHandRank(leftHand);
    finalResult.leftHandRank = leftHandResult.result;
    finalResult.leftHandSortedHand = leftHandResult.sortedHand;
    var rightHandResult = GetHandRank(rightHand);
    finalResult.rightHandRank = rightHandResult.result;
    finalResult.rightHandSortedHand = rightHandResult.sortedHand;
    if(handRankings[finalResult.leftHandRank]>handRankings[finalResult.rightHandRank])
        finalResult.winner = "Left";
    else if(handRankings[finalResult.leftHandRank]<handRankings[finalResult.rightHandRank])
        finalResult.winner = "Right";
    else{
        // Same rank, so we need to use other info we have to determine winner
        finalResult.isSameRank = true;
        // we just need to compare ranks of sortedHand by order
        var leftHandSortedRank = finalResult.leftHandSortedHand.ranks;
        var rightHandSortedRank = finalResult.rightHandSortedHand.ranks;
        for(var i=0; i<leftHandSortedRank.length;i++){
            if(leftHandSortedRank[i] > rightHandSortedRank[i]){
                finalResult.winner = "Left";
                break;
            }
            else if(leftHandSortedRank[i] < rightHandSortedRank[i]){
                finalResult.winner = "Right";
                break;
            }
        }
        if(finalResult.winner == null){
            finalResult.isTie = true;
        }
    }
    return finalResult;
 }

/**
 * HandCompare module is exported as function dealing compare two given hands and return all information related.
 * @module HandCompare
 * @type {function}
 */
 module.exports = HandCompare;

 /* -------------   The following are for test only --------------  */
 /*
var card1 = new Card("Diamond", 11), card2 = new Card("Heart", 3), card3 = new Card("Heart", 9);
var card4 = new Card("Club", 6), card5 = new Card("Heart", 5);
var leftHand = new Hand();
leftHand.Add([card1, card2, card3, card4, card5]);

var card1 = new Card("Diamond", 11), card2 = new Card("Diamond", 4), card3 = new Card("Diamond", 2);
var card4 = new Card("Diamond", 6), card5 = new Card("Heart", 9);
var rightHand = new Hand();
rightHand.Add([card1, card2, card3, card4, card5]);

var result = HandCompare(leftHand, rightHand);
console.log(result.leftHandRank);
console.log(result.leftHandSortedHand.GetSuitAndRank());
console.log(result.rightHandRank);
console.log(result.rightHandSortedHand.GetSuitAndRank());
console.log("winner", result.winner)
console.log("sameRank?", result.isSameRank);
console.log("tie?", result.isTie);
*/