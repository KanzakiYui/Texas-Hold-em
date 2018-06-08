var Card = require("./Card");                        
/** Class Hand is the basic class for poker hand consists of multiple Card instances */
 class Hand{
    /**
      * Hand's constructor is used to initial three properties for hand info, ranks info and suits info
    */
    constructor(){
        this.currentHand = new Array();
        this.ranks = new Array();
        this.suits = new Array();
    }
     /**
     * Add function is used to add one or multiple Card instance into current Hand instance
     * @param {Card | Card[]} card - one or multiple Card instance need to be added
     * @return {Hand} current Hand instance, this is implemented for callback chain usage
     */
    Add(card){
        if(Array.isArray(card)){
            card.forEach((eachCard)=>{
                this.currentHand.push(eachCard);
                this.AllRanks();
                this.AllSuits();
            });
        }
        else{
            this.currentHand.push(card);
            this.AllRanks();
            this.AllSuits();
        }
        return this;                                                        // return this allows us use callback chain
    }
    /**
     * AllRanks function is used to update ranks property by currentHand property
    */
    AllRanks(){
        this.ranks = this.currentHand.map(card=>{
            return card.rank;
        })
    }
    /**
     * AllSuits function is used to update suits property by currentHand property
    */
    AllSuits(){
        this.suits = this.currentHand.map(card=>{
            return card.suit;
        })
    }
    /**
     * GetCardsByRank function is used to get one or more Card instances by given rank
     * @param {int} rank - the rank used to retrieve
     * @return {Card[] | null} null if didn't find it or the array of Cards retrieved
     */
     GetCardsByRank(rank){
        var result = new Array();
        for(var i=0; i<this.currentHand.length;i++)
            if(this.currentHand[i].rank == rank)
                result.push(this.currentHand[i])
        if(result.length)
            return result;
        else
            return null;
     }
     /**
     * GetCardsBySuit function is used to get one or more Card instances by given suit
     * @param {string} suit - the suit used to retrieve
     * @return {Card[] | null} null if didn't find it or the array of Cards retrieved
     */
    GetCardsBySuit(suit){
        var result = new Array();
        for(var i=0; i<this.currentHand.length;i++)
            if(this.currentHand[i].suit == suit)
                result.push(this.currentHand[i])
        if(result.length)
            return result;
        else
            return null;
     }
     /**
     * GetCardByRankAndSuit function is used to get the specific Card instance by given rank and suit
     * @param {int} rank - the rank used to retrieve
     * @param {string} suit - the suit used to retrieve
     * @return {Card | null} null if didn't find it or the Card instance retrieved
     */
    GetCardByRankAndSuit(rank, suit){
        for(var i=0; i<this.currentHand.length;i++)
            if(this.currentHand[i].rank == rank && this.currentHand[i].suit == suit)
                return this.currentHand[i];
        return null;
     }
     /**
     * GetCardByPosition function is used to get the specific Card by position in hand
     * @param {int} position - the position used to retrieve
     * @return {Card | null} null if didn't position is invalid or Card instance found
     */
    GetCardByPosition(position){
        if(position >= this.currentHand.length || position < 0 )
            return null
        return this.currentHand[position];
    }
     /**
     * GetPositionByCard function is used to get the position (start from 0) of given Card instance in current Hand instance
     * @param {Card} card - the Card instance used to retrieve
     * @return {int} -1 if didn't find it or the position of the Card instance retrieved
     */
    GetPositionByCard(card){
         for(var i=0;i<this.currentHand.length;i++)
            if(this.currentHand[i].rank == card.rank && this.currentHand[i].suit == card.suit)
                return i;
        return -1;
     }
     /**
     * SwapCardPostion function is used to swap two Card instances by given two position
     * @param {int} positionA - the position used to swap
     * @param {int} positionB - the position used to swap
     * @return {undefined} only when the position is illegal
     */
     SwapCardPostion(positionA, positionB){
        if(positionA >= this.currentHand.length || positionA < 0 )
            return
        if(positionB >= this.currentHand.length || positionB < 0 )
            return
         else{
            var temp = this.currentHand[positionA];
            this.currentHand[positionA] = this.currentHand[positionB];
            this.currentHand[positionB] = temp;
            this.AllRanks();
            this.AllSuits();
         }
     }
     /**
     * GetSuitAndRank function is used to get information of only suit and rank of Card instances in current Hand instance
     * @return {string} suit and rank information
     */
     GetSuitAndRank(){
        let current = new String();
         for (var i=0;i<this.currentHand.length;i++){
             let rank;
             if(this.currentHand[i].rank == 11) rank = 'J';
             else if(this.currentHand[i].rank == 12) rank = 'Q';
             else if(this.currentHand[i].rank == 13) rank = 'K';
             else if(this.currentHand[i].rank == 14) rank = 'A';
             else rank = this.currentHand[i].rank
             current+=`${this.currentHand[i].suit} ${rank}`.padEnd(20, ' ');
         }
        return current;
     }
 }

 /**
 * Hand module is exported with Hand class definition.
 * @module Hand
 * @type {Hand}
 */
 module.exports = Hand;

 /* -------------   The following are for test only --------------  */
/*
var hand = new Hand();
var card1 = new Card('Spade', 5);
var card2 = new Card('Club', 10);
var card3 = new Card('Club', 5);
var card4 = new Card('Club', 9);
var card5 = new Card('Heart', 5);
hand.Add(card1).Add(card2).Add([card3, card4, card5]);
console.log(hand.GetSuitAndRank());
console.log(hand.ranks);
console.log(hand.suits);
hand.SwapCardPostion(hand.GetPositionByCard(card2), hand.GetPositionByCard(card5));
console.log(hand.GetSuitAndRank());
console.log(hand.ranks);
console.log(hand.suits);
*/