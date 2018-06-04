var Cards = require("./Cards");
var Card = require("./Card");
var Hand = require("./Hand");
/*
    This page is for test only. The methods used here for Hand assignment, Hand shuffle and
    Hand compare may be useful for formal development.
*/

/*
    Global Variables:
    [1] HandRankings:   using number 1~ 9 to identify: High Card, One Pair, Two Pairs, Three of a Kind, Straight, Flush, Full House, Four of a Kind, Straight Flush
*/
const HandRankings = {
    "High Card": 1, "One Pair": 2, "Two Pairs": 3, "Three of a Kind": 4, "Straight": 5, "Flush": 6, "Full House": 7, "Four of a Kind": 8, "Straight Flush": 9
}
/*
 * Used to shuffle an array (element with new index), it will modify the array itself
 * Usage: yourArray.Shuffle()
 * Note: very basic shuffle, it's not a random enough algorithm
*/
Array.prototype.Shuffle= function(){
    for(var currentIndex = this.length; currentIndex > 0; currentIndex --){
        let newIndex = Math.floor(Math.random()*currentIndex);
        let tempVar = this[currentIndex-1];
        this[currentIndex-1] = this[newIndex];
        this[newIndex] = tempVar; 
    }
    return this;                //  return this allows us to make a shuffle chain, see below
}

/*  --------------- The followings below are for comparing two given hands ----------------  */
function Compare(leftHand, rightHand){
    var leftHandRank = GetHandRank(leftHand);
    var rightHandRank = GetHandRank(rightHand);
    if(HandRankings[leftHandRank.result]>HandRankings[rightHandRank.result])
        return `Left Hand (${leftHandRank.result}) is bigger than Right Hand (${rightHandRank.result})`;
    else if(HandRankings[leftHandRank.result]<HandRankings[rightHandRank.result])
        return `Right Hand (${rightHandRank.result}) is bigger than Left Hand (${leftHandRank.result})`;
    else{
        /*
            Two hand has the same rank, then compare the highest, remains, etc.
        */
        if(leftHandRank.result=="Straight Flush"){
            var leftHightest = leftHandRank.highest
            var rightHighest = rightHandRank.highest
            if(leftHightest>rightHighest)
                return `Both hands are Straight Flush, but Left Hand's highest rank is ${leftHightest}, which is bigger than Right Hand's highest rank ${rightHighest}`;
            else if(leftHightest>rightHighest)
                return `Both hands are Straight Flush, but Right Hand's highest rank is ${rightHighest}, which is bigger than Left Hand's highest rank ${leftHightest}`;
            else
                return "Both hands are Straight Flush, and they has same ranks, so it's a tie!";
        }
        else if(leftHandRank.result=="Four of a Kind"){
            var leftRank = leftHandRank.rank
            var leftKicker = leftHandRank.kicker
            var rightRank = rightHandRank.rank
            var rightKicker = rightHandRank.kicker  
            if(leftRank>rightRank)
                return `Both hands are Four of a Kind, but Left Hand's rank is ${leftRank}, which is bigger than Right Hand's rank ${rightRank}`;
            else if(leftRank<rightRank)
                return `Both hands are Four of a Kind, but Right Hand's rank is ${rightRank}, which is bigger than Left Hand's rank ${leftRank}`;
            else{
                if(leftKicker>rightKicker)
                    return `Both hands are Four of a Kind and have the same rank, but Left Hand's kicker is ${leftKicker}, which is bigger than Right Hand's kick ${rightKicker}`;
                else if(leftKicker<rightKicker)
                    return `Both hands are Four of a Kind and have the same rank, but Right Hand's kicker is ${rightKicker}, which is bigger than Left Hand's kick ${leftKicker}`;
                else
                    return "Both hands are Four of a Kind and have the same rank and even same kicker, so it's a tie!";
            }
        }
        else if(leftHandRank.result=="Full House"){
            var leftRank1 = leftHandRank.rank1
            var leftRank2 = leftHandRank.rank2
            var rightRank1 = rightHandRank.rank1
            var rightRank2 = rightHandRank.rank2
            if(leftRank1>rightRank1)
                return `Both hands are Full House, but Left Hand's rank of the Three of a Kind is ${leftRank1}, which is bigger than Right Hand's rank of the Three of a Kind ${rightRank1}`;
            else if (leftRank1<rightRank1)
                return `Both hands are Full House, but Right Hand's rank of the Three of a Kind is ${rightRank1}, which is bigger than Left Hand's rank of the Three of a Kind ${leftRank1}`;
            else{
                if(leftRank2>rightRank2)
                    return `Both hands are Full House with same Three of a Kind, but Left Hand's rank of the One Pair is ${leftRank2}, which is bigger than Right Hand's rank of the One Pair ${rightRank2}`;
                else if (leftRank2<rightRank2)
                    return `Both hands are Full House with same Three of a Kind, but Right Hand's rank of the One Pair is ${rightRank2}, which is bigger than Left Hand's rank of the One Pair ${leftRank2}`;
                else
                    return "Both hands are Full House with same Three of a Kind and even same One Pair, so it's a tie!";
            }
        }
        else if(leftHandRank.result=="Flush"){
            var leftRanks = leftHandRank.hand;
            var rightRanks = rightHandRank.hand;
            var result = arrayComparison(leftRanks, rightRanks);
            if(result == 1)
                return "Both hands are Flush, but Left Hand is bigger than Right Hand";
            else if(result == -1)
                 return "Both hands are Flush, but Right Hand is bigger than Left Hand";
            else
                return "Both hands are Flush with same cards, so it's a tie!";
        }
        else if(leftHandRank.result=="Straight"){
            var leftHightest = leftHandRank.highest
            var rightHighest = rightHandRank.highest
            if(leftHightest>rightHighest)
                return `Both hands are Straight, but Left Hand's highest rank is ${leftHightest}, which is bigger than Right Hand's highest rank ${rightHighest}`;
            else if(leftHightest>rightHighest)
                return `Both hands are Straight, but Right Hand's highest rank is ${rightHighest}, which is bigger than Left Hand's highest rank ${leftHightest}`;
            else
                return "Both hands are Straight, and they has same ranks, so it's a tie!";
        }
        else if(leftHandRank.result=="Three of a Kind"){
            var leftRank = leftHandRank.rank;
            var leftKickers = leftHandRank.kickers;
            var rightRank = rightHandRank.rank;
            var rightKickers = rightHandRank.kickers;
            if(leftRank>rightRank)
                return `Both hands are Three of a Kind, but Left Hand's rank is ${leftRank}, which is bigger than Right Hand's rank ${rightRank}`;
            else if (leftRank<rightRank)
                return `Both hands are Three of a Kind, but Right Hand's rank is ${rightRank}, which is bigger than Left Hand's rank ${leftRank}`;
            else{
                var result = arrayComparison(leftKickers, rightKickers);
                if(result == 1)
                    return `Both hands are Three of a Kind with same rank, but Left Hand's kickers are bigger than Right Hand's kickers`;
                else if (result == -1)
                    return `Both hands are Three of a Kind with same rank, but Right Hand's kickers are bigger than Left Hand's kickers`;
                else
                    return "Both hands are Three of a Kind with same rank and even same two kickers, so it's a tie!";
            }
        }
        else if(leftHandRank.result=="Two Pairs"){
            var leftRanks = leftHandRank.ranks;
            var leftKicker = leftHandRank.kicker;
            var rightRanks = rightHandRank.ranks;
            var rightKicker = rightHandRank.kicker;
            var result = arrayComparison(leftRanks, rightRanks);
            if(result == 1)
                return "Both hands are Two Pairs, but Left Hand has bigger pair than Right Hand";
            else if(result == -1)
                return "Both hands are Two Pairs, but Right Hand has bigger pair than Left Hand";
            else{
                if(leftKicker>rightKicker)
                    return "Both hands are Two Pairs with same pairs, but Left Hand has a bigger kicker than Right Hand";
                else if(rightKicker>leftKicker)
                    return "Both hands are Two Pairs with same pairs, but Right Hand has a bigger kicker than Left Hand";
                else
                    return "Both hands are Two Pairs with same pairs and even with same kicker, so it's a tie!"; 
            }
        }
        else if(leftHandRank.result=="One Pair"){
            var leftRank = leftHandRank.rank;
            var leftKickers = leftHandRank.kickers;
            var rightRank = rightHandRank.rank;
            var rightKickers = rightHandRank.kickers;
            if(leftRank>rightRank)
                return `Both hands are One Pair, but Left Hand's rank is ${leftRank}, which is bigger than Right Hand's rank ${rightRank}`;
            else if (leftRank<rightRank)
                return `Both hands are One Pair, but Right Hand's rank is ${rightRank}, which is bigger than Left Hand's rank ${leftRank}`;
            else{
                var result = arrayComparison(leftKickers, rightKickers);
                if(result == 1)
                    return `Both hands are One Pair with same rank, but Left Hand's kickers are bigger than Right Hand's kickers`;
                else if (result == -1)
                    return `Both hands are One Pair with same rank, but Right Hand's kickers are bigger than Left Hand's kickers`;
                else
                    return "Both hands are One Pair with same rank and even same two kickers, so it's a tie!";
            }
        }
        else{
            var leftRanks = leftHandRank.hand;
            var rightRanks = rightHandRank.hand;
            var result = arrayComparison(leftRanks, rightRanks);
            if(result == 1)
                return `Both hands are High Card, but Left Hand's cards are bigger than Right Hand's cards`;
            else if (result == -1)
                return `Both hands are High Card, but Right Hand's cards are bigger than Left Hand's cards`;
            else
                return "Both hands are High Card and even same cards, so it's a tie!";
        }
    }
}

function GetHandRank(hand){
    var ranks = hand.ranks;
    var suits = hand.suits;
    var categorizedRanks = arrayCategory(ranks);
    var categorizedSuits = arrayCategory(suits);
    var isRankSequence = IsSequence(ranks);
    var rankKeyPairArray = Object.entries(categorizedRanks);    // Return an array of  [key, value] pairs where key means rank, value means count
    /*
        Of course, we only need to consider if 5 cards can be placed into at most 4 categories.
    */
    var rankAndCount1 = rankKeyPairArray[0];
    var rankAndCount2 = rankKeyPairArray[1];
    var rankAndCount3 = rankKeyPairArray[2];
    var rankAndCount4 = rankKeyPairArray[3];
    if(rankAndCount1)
        rankAndCount1 = [Number(rankAndCount1[0]), Number(rankAndCount1[1])];
    if(rankAndCount2)
        rankAndCount2 = [Number(rankAndCount2[0]), Number(rankAndCount2[1])];
    if(rankAndCount3)
        rankAndCount3 = [Number(rankAndCount3[0]), Number(rankAndCount3[1])];
    if(rankAndCount4)
        rankAndCount4 = [Number(rankAndCount4[0]), Number(rankAndCount4[1])];
    /*
        Check if:           Straight Flush
        Condition:        Five cards in a sequence and all of them have same suit
    */
   if(Object.keys(categorizedSuits).length == 1 && isRankSequence.result == true)
        return {result: "Straight Flush", highest: isRankSequence.highest}
    /*
        Check if:           Four of a Kind
        Condition:        Four cards has the same rank
    */
    /*
        Check if:           Full House
        Condition:       Three cards has the same rank and the other two has the same rank
    */
    else if(Object.keys(categorizedRanks).length == 2){
        // If ranks can be placed into only two categories, then it can only be 4 + 1 or 2 + 3
        if(rankAndCount1[1]==4)                 // rankAndCountB[1] must be 5-4 = 1
            return {result: "Four of a Kind", rank: rankAndCount1[0], kicker: rankAndCount2[0]}
        else if (rankAndCount2[1]==4) 
            return {result: "Four of a Kind", rank: rankAndCount2[0], kicker: rankAndCount1[0]}
        else if(rankAndCount1[1]==3)        // rankAndCountB[1] must be 5-3 = 2
            return {result: "Full House", rank1: rankAndCount1[0], rank2: rankAndCount2[0]}
        else
            return {result: "Full House", rank1: rankAndCount2[0], rank2: rankAndCount1[0]}
    }
    /*
        Check if:          Flush
        Condition:       Five cards have the same suit
    */
    else if(Object.keys(categorizedSuits).length == 1){
       return {result: "Flush", hand: ranks}
    }
    /*
        Check if:          Straight
        Condition:       Five cards are in a sequence
    */
    else if (isRankSequence.result == true){
        return {result: "Straight", highest: isRankSequence.highest}
    }
    /*
        Check if:          Three of a Kind
        Condition:       Three cards have the same rank
    */
    /*
        Check if:          Two Pairs
        Condition:       Two cards have the same rank, the other two card also have the same rank
    */
    else if(Object.keys(categorizedRanks).length == 3){
        // If ranks can be placed into only three categories, then it can only be 3 + 1 + 1 or 2 + 2 + 1
        if(rankAndCount1[1] == 3){              // rankAndCount2[1] and rankAndCount3[1] are 1
            return {result: "Three of a Kind", rank: rankAndCount1[0], kickers: [rankAndCount2[0], rankAndCount3[0]]};
        }
        else if(rankAndCount2[1] == 3){     // rankAndCount1[1] and rankAndCount3[1] are 1
            return {result: "Three of a Kind", rank: rankAndCount2[0], kickers: [rankAndCount1[0], rankAndCount3[0]]};
        }
        else if(rankAndCount3[1] == 3){     // rankAndCount1[1] and rankAndCount2[1] are 1
            return {result: "Three of a Kind", rank: rankAndCount3[0], kickers: [rankAndCount1[0], rankAndCount2[0]]};
        }
        // Now, the case can only be 2 + 2 + 1, we just need to pick which one is that 1 (kicker)
        else if(rankAndCount1[1]== 1){
            return {result: "Two Pairs", ranks: [rankAndCount2[0], rankAndCount3[0]], kicker: rankAndCount1[0]};
        }
        else if(rankAndCount2[1]== 1){
            return {result: "Two Pairs", ranks: [rankAndCount1[0], rankAndCount3[0]], kicker: rankAndCount2[0]};
        }
        else{
            return {result: "Two Pairs", ranks: [rankAndCount1[0], rankAndCount2[0]], kicker: rankAndCount3[0]};
        }
   }
   /*
        Check if:          One Pair
        Condition:       Only two cards have the same rank
    */
    else if(Object.keys(categorizedRanks).length == 4){             
        // In this case, we have 2 + 1 + 1 + 1
        if(rankAndCount1[1] == 2){ 
            return {result: "One Pair", rank: rankAndCount1[0], kickers: [rankAndCount2[0],rankAndCount3[0],rankAndCount4[0]]};
        }
        else if(rankAndCount2[1] == 2){ 
            return {result: "One Pair", rank: rankAndCount2[0], kickers: [rankAndCount1[0],rankAndCount3[0],rankAndCount4[0]]};
        }
        else if(rankAndCount3[1] == 2){ 
            return {result: "One Pair", rank: rankAndCount3[0], kickers: [rankAndCount1[0],rankAndCount2[0],rankAndCount4[0]]};
        }
        else { 
            return {result: "One Pair", rank: rankAndCount4[0], kickers: [rankAndCount1[0],rankAndCount2[0],rankAndCount3[0]]};
        }
   }
   // The only left case is "High Card"
   else{
        return {result: "High Card", hand: ranks};
   }
}
/*  --------------- Support fucntionalities that may be used  ----------------  */
/*
    function: arrayCategory
    @param: {array}  arrayVar  array need to be categorized    
    This function is is used to categorize values in an array and set as {key: value in array, value: numbers} 
*/
function arrayCategory(arrayVar){
    var result = new Object();
    arrayVar.forEach(element => {
        if(result.hasOwnProperty(element))
            result[element] ++;
        else
            result[element] = 1;
    });
    return result;
}
/*
    function: IsSequence
    @param: {array}  arrayVar  array need to be judged    
    This function is is used to determine if the array is in a sequence, if so, it will also return highest number
*/
function IsSequence(arrayVar){
    var tempArray = arrayVar.slice();                       // shallow copy of array
    tempArray.sort((a, b)=>{return b-a;});              // sort from high to low
    for(var i=0; i<tempArray.length-1; i++){
        if(tempArray[i] - tempArray[i+1] != 1)
            return {result: false, highest: null};
    }
    return {result: true, highest: tempArray[0]};
}
/*
    function: arrayComparison
    @param: {array}  array1  array need to be compared   
    @param: {array}  array2  array need to be compared    
    This function is is used to which array is "bigger", if five card are totally separately same, then tie
*/
function arrayComparison(array1, array2){
    var tempArray1 = array1.slice();                    // shallow copy
    var tempArray2 = array2.slice();
    tempArray1.sort((a, b)=>{return b-a;});       // sort from high to low
    tempArray2.sort((a, b)=>{return b-a;}); 
    for(var i=0; i<tempArray1.length; i++){
        if(tempArray1[i]>tempArray2[i])
            return 1;               // 1 means array1 > array2
        else if(tempArray1[i]<tempArray2[i])
            return -1;              // -1 means array1 < array2
    }
    return 0;                       // 0 means tie
}

/* -------------------------------------- The following are for debug only  ---------------------------------  */
// This function can be run anytime you want to get two random hands and get the comparison result
function POKER_TEST(){                                                                     
    Cards.Shuffle().Shuffle().Shuffle();
    // Now we assigns each five cards to totally 2 hands (left and right)
    var leftHand = new Hand();
    var rightHand = new Hand();
    for(var i=0; i<5; i++)
        leftHand.Add(Cards[i]);
    for(var i=5; i<10; i++)
        rightHand.Add(Cards[i]);
    var message = "Left Hand:\n"+leftHand.quickDebugShow()+"\nRightHand:\n"+rightHand.quickDebugShow()+"\n\n";
    message +="Result:\n"+Compare(leftHand, rightHand);
    console.log(message);
    return message;
}

module.exports = POKER_TEST;


// The following is for Arbitrary Test
/*
var leftHand = new Hand();
var rightHand = new Hand();
leftHand.Add(new Card('C', 2)).Add(new Card('C', 10)).Add(new Card('S', 9)).Add(new Card('C', 6)).Add(new Card('C', 14));
rightHand.Add(new Card('H', 4)).Add(new Card('S', 4)).Add(new Card('D', 6)).Add(new Card('S', 6)).Add(new Card('C', 4));
var message = "Left Hand:\t\t"+leftHand.quickDebugShow()+"\nRightHand:\t\t"+rightHand.quickDebugShow()+"\n";
message +="Result:\n"+Compare(leftHand, rightHand);
console.log(message);
*/