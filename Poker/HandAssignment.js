var Card = require("./Card");

/**
 * Shuffle function is customized to all array type variables. It's used to shuffle members' positions of current array
 */
Array.prototype.Shuffle= function(){
    for(var currentIndex = this.length; currentIndex > 0; currentIndex --){
        let newIndex = Math.floor(Math.random()*currentIndex);
        let tempVar = this[currentIndex-1];
        this[currentIndex-1] = this[newIndex];
        this[newIndex] = tempVar; 
    }
    return this;                            //  return this allows us to create callback chain
}

/**
 * HandAssignment function is used for Texas Hold'em or similar gameplay poker assignment. 
 * @param {int} handNumber - How many players are playing.
 * @param {int} minmumShuffleTimes - The minimum shuffle times for poker cards.
 * @param {int} pocketCardsNumber - How many pocket cards each player can hold.
 * @param {int} communityCardsNumber - How many community cards allowed.
 * @return {object} The assignment result consists of each player's pockets cards and all community cards. It also provides a shorthand function to show such infomation.
 */
function HandAssignment(handNumber, minmumShuffleTimes, pocketCardsNumber, communityCardsNumber){
    /*
        Suppose we have x players/hands, then totally we need 5 (community cards) + 2x cards
        The first 2x cards will be assgined to x hands, the last 5 cards will be community cards
    */
    var Cards = (function(){
        let suit = ['Club', 'Diamond', 'Heart', 'Spade'];
        let rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        let result = new Array();
        for(var i=0; i<suit.length; i++)
            for(var j=0; j<rank.length; j++)
                result.push(new Card(suit[i], rank[j]));
        return result;
    })();
    var randomSuffleTime = minmumShuffleTimes + Math.ceil(Math.random()*3);
    for(var i=0; i<randomSuffleTime; i++)
        Cards.Shuffle();
    var assignmentResult = new Object();
    for(var i=0; i<handNumber; i++){
        assignmentResult['Hand'+(i+1)] = new Array();
        for(var j=0; j<pocketCardsNumber;j++)
            assignmentResult['Hand'+(i+1)].push(Cards[(pocketCardsNumber)*i+j]);
    }
    assignmentResult['Community'] = new Array();
    for(var i=0; i<communityCardsNumber; i++)
        assignmentResult['Community'].push(Cards[handNumber*pocketCardsNumber+i]);
    assignmentResult.show=function(){
        var message = new Object();
        for(var i=0;i<handNumber;i++){
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
 * HandAssignment module is exported as function dealing how to assgin players cards.
 * @module HandAssignment
 * @type {function}
 */
module.exports = HandAssignment;
 /* -------------   The following are for test only --------------  */
 /*
var assign = HandAssignment(3, 3, 2, 5);
assign.show();
*/



