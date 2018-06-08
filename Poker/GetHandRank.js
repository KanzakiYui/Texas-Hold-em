/**
 * GetHandRank function is used to evaluate a given hand
 * @param {Hand} hand - A Hand instance needs to be evaluated
 * @return {object[]} An object consists of Hand Rank and all relevant information
 */
function GetHandRank(hand){
    var lengthofHand = hand.ranks.length;
    var ranks = hand.ranks;
    var suits = hand.suits;
    var countedRanks = ValueCountForArray(ranks);
    var countedSuits = ValueCountForArray(suits);
    var sequenceCheck = IsRankInSequence(ranks);
    /**
     * Check if:              Straight Flush
     * Condition:           Five cards in a sequence and all of them have same suit
     */
    if(countedSuits.length == 1 && sequenceCheck.result ){
        var result = "Straight Flush";
        var sortedRanks = sequenceCheck.sortedRanks;
        for(var i=0;i<lengthofHand;i++){
            var card = hand.GetCardsByRank(sortedRanks[i])[0];          // card must be unique
            var oldPos = hand.GetPositionByCard(card);
            hand.SwapCardPostion(i, oldPos);
        }
        return {result: result, sortedHand: hand};
    }
    /**
     * Check if:                 Four of a Kind
     *  Condition:            Four cards has the same rank
     */
    else if(countedRanks.length==2 && countedRanks[0].count == 4){
        var result = "Four of a Kind";
        var valueOfKicker = countedRanks[1].value;         // 1 card has value of valueOfKicker
        // we just need to swap the kicker with valueOfKicker to the last position of hand
        var card = hand.GetCardsByRank(valueOfKicker)[0];
        var oldPos = hand.GetPositionByCard(card);
        hand.SwapCardPostion(lengthofHand-1, oldPos);
        return {result: result, sortedHand: hand}; 
    }
    /**
     * Check if:           Full House
     * Condition:        Three cards has the same rank and the other two has the same rank
     */
    else if(countedRanks.length==2 && countedRanks[0].count == 3){
        var result = "Full House";
        // we just need to swap the cards with valueOfKicker to the last two positions of hand
        var card1 = hand.GetCardsByRank(countedRanks[0].value)[0];
        var card2 = hand.GetCardsByRank(countedRanks[0].value)[1];
        var card3 = hand.GetCardsByRank(countedRanks[0].value)[2];
        var card4 = hand.GetCardsByRank(countedRanks[1].value)[0];
        var card5 = hand.GetCardsByRank(countedRanks[1].value)[1];
        hand.SwapCardPostion(0, hand.GetPositionByCard(card1));
        hand.SwapCardPostion(1, hand.GetPositionByCard(card2));
        hand.SwapCardPostion(2, hand.GetPositionByCard(card3));
        hand.SwapCardPostion(3, hand.GetPositionByCard(card4));
        hand.SwapCardPostion(4, hand.GetPositionByCard(card5));
        return {result: result, sortedHand: hand}; 
    }
    /**
     * Check if:          Flush
     * Condition:       Five cards have the same suit
     */
    else if(countedSuits.length == 1){
        var result = "Flush";
        // We just need to sort by rank from high to low
        var sortedRanks = ranks.slice();
        sortedRanks.sort((a, b)=>{return b-a;});
        for(var i=0;i<lengthofHand;i++){
            var card = hand.GetCardsByRank(sortedRanks[i])[0];
            hand.SwapCardPostion(i, hand.GetPositionByCard(card));
        }
        return {result: result, sortedHand: hand}; 
        return {result: result, sortedHand: hand}; 
    }
    /**
     *  Check if:          Straight
     * Condition:        Five cards are in a sequence
    */
    else if(sequenceCheck.result){
        var result = "Straight";
        var sortedRanks = sequenceCheck.sortedRanks;
        for(var i=0;i<lengthofHand;i++){
            var card = hand.GetCardsByRank(sortedRanks[i])[0];          // card must be unique
            var oldPos = hand.GetPositionByCard(card);
            hand.SwapCardPostion(i, oldPos);
        }
        return {result: result, sortedHand: hand};
    }
    /**
     *  Check if:          Three of a Kind
     *  Condition:       Three cards have the same rank
    */
    else if(countedRanks.length==3 && countedRanks[0].count == 3){
        var result = "Three of a Kind";
        var valueOfKicker1 = countedRanks[1].value;         // 1 card has value of valueOfKicker1
        var valueOfKicker2 = countedRanks[2].value;         // 1 card has value of valueOfKicker2
        // we just need to swap the cards with valueOfKicker1 and valueOfKicker2 (from high to low) to the last two positions of hand
        var card1 = hand.GetCardsByRank(valueOfKicker1)[0];
        var oldPos1 = hand.GetPositionByCard(card1);
        var card2 = hand.GetCardsByRank(valueOfKicker2)[0];
        var oldPos2 = hand.GetPositionByCard(card2);
        if(valueOfKicker1>valueOfKicker2){
            // Note: always swap larger one first
            hand.SwapCardPostion(lengthofHand-2, oldPos1);
            hand.SwapCardPostion(lengthofHand-1, oldPos2);
        }
        else{
            hand.SwapCardPostion(lengthofHand-2, oldPos2);
            hand.SwapCardPostion(lengthofHand-1, oldPos1);
        }
        return {result: result, sortedHand: hand}; 
    }
    /**
     *  Check if:          Two Pairs
     *  Condition:       Two cards have the same rank, the other two card also have the same rank
    */
    else if(countedRanks.length==3 && countedRanks[0].count == 2){
        // Ideally, we place higher one pair first, lower one pair later and kicker last
        var result = "Two Pairs";
        var valueOfPairA = countedRanks[0].value        // 2 cards
        var valueOfPairB = countedRanks[1].value        // 2 cards
        var valueOfKicker = countedRanks[2].value        // 2 cards
        var cardA1 = hand.GetCardsByRank(valueOfPairA)[0];
        var cardA2 = hand.GetCardsByRank(valueOfPairA)[1];
        var cardB1 = hand.GetCardsByRank(valueOfPairB)[0];
        var cardB2 = hand.GetCardsByRank(valueOfPairB)[1];
        var kicker = hand.GetCardsByRank(valueOfKicker)[0];
        if(valueOfPairA > valueOfPairB){
            hand.SwapCardPostion(0, hand.GetPositionByCard(cardA1));
            hand.SwapCardPostion(1, hand.GetPositionByCard(cardA2));
            hand.SwapCardPostion(2, hand.GetPositionByCard(cardB1));
            hand.SwapCardPostion(3, hand.GetPositionByCard(cardB2));
        }
        else{
            hand.SwapCardPostion(0, hand.GetPositionByCard(cardB1));
            hand.SwapCardPostion(1, hand.GetPositionByCard(cardB2));
            hand.SwapCardPostion(2, hand.GetPositionByCard(cardA1));
            hand.SwapCardPostion(3, hand.GetPositionByCard(cardA2));
        }
        hand.SwapCardPostion(4, hand.GetPositionByCard(kicker));
        return {result: result, sortedHand: hand}; 
    }
    /**
     * Check if:          One Pair
     * Condition:       Only two cards have the same rank
    */
    else if(countedRanks.length==4 && countedRanks[0].count == 2){
        var result = "One Pair";
        var valueOfPair = countedRanks[0].value        // 2 cards
        var arrayofKickers = [countedRanks[1].value, countedRanks[2].value, countedRanks[3].value];
        arrayofKickers.sort((a, b)=>{return b-a;});       // sort from high to low
        var cardA1 = hand.GetCardsByRank(valueOfPair)[0];
        var cardA2 = hand.GetCardsByRank(valueOfPair)[1];
        var kicker1 = hand.GetCardsByRank(arrayofKickers[0])[0];
        var kicker2 = hand.GetCardsByRank(arrayofKickers[1])[0];
        var kicker3 = hand.GetCardsByRank(arrayofKickers[2])[0];
        hand.SwapCardPostion(0, hand.GetPositionByCard(cardA1));
        hand.SwapCardPostion(1, hand.GetPositionByCard(cardA2));
        hand.SwapCardPostion(2, hand.GetPositionByCard(kicker1));
        hand.SwapCardPostion(3, hand.GetPositionByCard(kicker2));
        hand.SwapCardPostion(4, hand.GetPositionByCard(kicker3));
        return {result: result, sortedHand: hand}; 
    }
    //  Other case: High card, we place in order by rank from high to low
    else{
        var result = "High Card";
        var sortedRanks = ranks.slice();
        sortedRanks.sort((a, b)=>{return b-a;});
        for(var i=0;i<lengthofHand;i++){
            var card = hand.GetCardsByRank(sortedRanks[i])[0];
            hand.SwapCardPostion(i, hand.GetPositionByCard(card));
        }
        return {result: result, sortedHand: hand}; 
    }
}

/**
 * GetHandRank module is exported as function dealing how to give all handrank information of a given hand.
 * @module GetHandRank
 * @type {function}
 */
module.exports = GetHandRank;

/*  --------------- The following are support functions  ----------------  */
/**
 * ValueCountForArray function is to count the occurrence time of each value in the given array
 * @param {int[] | string[]} arrayNeedsToBeCounted - Array needs to be counted, usually an array of int or string or other literals
 * @return {JSON[]} An sorted array of JSON objects. Each object has property named value identifying what value is counted, the corresponding value is called count for occurrence. The whole array is sorted by occurence of each value from high to low 
 */
function ValueCountForArray(arrayNeedsToBeCounted){
    var resultObject = new Object();
    arrayNeedsToBeCounted.forEach(element => {
        if(resultObject.hasOwnProperty(element))
            resultObject[element] ++;
        else
            resultObject[element] = 1;
    });
    var resultArray = new Array();
    for(var value in resultObject)
        resultArray.push({value: Number(value) == value?Number(value): value, count: resultObject[value]});
    resultArray.sort((a, b)=>{ return b.count - a.count;});
    return resultArray;
}

/**
 * IsRankInSequence function is to check if given ranks (usually an array of 5 integers) is in a sequence
 * @param {int[]} arrayNeedsToBeChecked - Array needs to be checked
 * @return {JSON}  A result information consists of check result, sorted ranks if it's in a sequence
 */
function IsRankInSequence(arrayNeedsToBeChecked){
    var tempArray = arrayNeedsToBeChecked.slice();                       // shallow copy of array
    /**
     * Note, a special case is that, if 2, 3, 4, 5, A(14) is sorted as result, A should be considered as 1. 
     * In this case, 2, 3, 4, 5, A is in a sequence while the highest one is 5
     */
    tempArray.sort((a, b)=>{return b-a;});                                           // sort from high to low
    // We firstly handle the special case
    if(tempArray[0] == 14&&tempArray[1] == 5&&tempArray[2] == 4&&tempArray[3] == 3&&tempArray[4] == 2){                                     
        return {result: true, sortedRanks: [5, 4, 3, 2, 14]};                   // Here 14 means 1
    }
    else{
        for(var i=0; i<tempArray.length-1; i++){
            if(tempArray[i] - tempArray[i+1] != 1)
                return {result: false, sortedRanks: null};
        }
        return {result: true, sortedRanks: tempArray};
    }
}

 /* -------------   The following are for test only --------------  */
 /*
 var test1 = ["Spade", "Club", "Diamond","Heart", "Spade"];
 var check = ValueCountForArray(test1);
 for(var i=0;i<check.length;i++)
     console.log(check[i]);
var test2 = [1, 3, 3, 5, 1];
check = ValueCountForArray(test2);
for(var i=0;i<check.length;i++)
    console.log(check[i]);
*/

/*
var test1 = IsRankInSequence([1, 3, 5, 7, 6]);
var test2 = IsRankInSequence([2, 3, 5, 4, 6]);
var test3 = IsRankInSequence([3, 14, 5, 2, 4]);
console.log(test1.result, test1.sortedRanks);
console.log(test2.result, test2.sortedRanks);
console.log(test3.result, test3.sortedRanks);
*/

/*
var card1 = new Card("Heart", 11);
var card2 = new Card("Diamond", 6);
var card3 = new Card("Club", 8);
var card4 = new Card("Spade", 7);
var card5 = new Card("Heart", 5);
var hand = new Hand();
hand.Add([card1, card2, card3, card4, card5]);
console.log(hand.GetSuitAndRank());
var result = GetHandRank(hand);
console.log(result.result)
console.log(result.sortedHand.GetSuitAndRank());
*/