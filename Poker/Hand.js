// var Card = require("./Card");                        // May not use

/*
 * Class:   Hand
 *      An instance of Hand may include 0 up to 5 instances of Card, at most 2 of them are Pocket Card
 * while at least 3 of them are Community Card. The most important usage of Hand is used for comparing any two Hands and determine the
 * bigger one. Finally, used to determine the winner. It not only holds several Card instances, but also provide some methods to make comparison
 * in the near future easier.
 * 1. Properties
 *      1.1 currentHand
 *          An array of Card instances to indicate what cards it currently holds.
 *      1.2 sortedHand
 *          An identical hand while cards inside is sorted by rank (from high to low)
 *      1.3 ranks
 *          An array stores ranks of all cards currently holds, regardless of suit
 *      1.4 suits
 *          An array stores suits of all cards currently holds, regardless of rank
 * 2. Methods
 *      2.1 Add(Card)
 *          Add one Card instance to current Hand
 *      2.2 SortedHand()
 *          Sort the current hand by rank from high to low, store in sortedHand while keep currentHand originally and intact. 
 *      2.3 AllRanks()
 *          Used for updating property ranks
 *      2.4 AllSuits()
 *          Used for updating property suits
 *      2.5 GetCardsByRank(rank)
 *          Return all cards this hand holds by given rank (at most 4 cards) or null
 *      2.6 GetCardsBySuit(suit)
 *          Return all cards this hand holds by given suit (at most 5 cards) or null
 *      2.7 GetCardByRankAndSuit(rank, suit)
 *          Return a specific card this hand holds by given rank and suit or null
 *      2.8 debugShow()
 *          For debug only, used to show currentHand and sortedHand
 *      2.9 quickDebugShow()
 *          A simplier version of debugShow()
 */

 class Hand{
     constructor(){
        this.currentHand = new Array();
        this.sortedHand = new Array();
        this.ranks = new Array();
        this.suits = new Array();
     }
     Add(card){
        this.currentHand.push(card);
        this.sortedHand.push(card);
        this.SortedHand();
        this.AllRanks();
        this.AllSuits();
        return this;
     }
     SortedHand(){
        this.sortedHand.sort((prev, next)=>{
            return next.rank-prev.rank;                       // sorted from high to low
        });
     }
     AllRanks(){
        this.ranks = this.currentHand.map(card=>{
            return card.rank;
        })
     }
     AllSuits(){
        this.suits = this.currentHand.map(card=>{
            return card.suit;
        })
     }
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
     GetCardByRankAndSuit(rank, suit){
        for(var i=0; i<this.currentHand.length;i++)
            if(this.currentHand[i].rank == rank && this.currentHand[i].suit == suit)
                return this.currentHand[i]
        return null;
     }
     debugShow(){
         let current = "current Hand:\n";
         let sorted = "sorted Hand:\n";
         let rankofAll = "all ranks of Hand:\n";
         let suitofAll = "all suits of Hand:\n";
         for (var i=0;i<this.currentHand.length;i++){
            current+=`${this.currentHand[i].suit} ${this.currentHand[i].rank}      `;
            sorted+=`${this.sortedHand[i].suit} ${this.sortedHand[i].rank}      `;
            rankofAll += `${this.ranks[i]}   `;
            suitofAll += `${this.suits[i]}   `;
         }
         console.log(current);
         console.log(sorted);
         console.log(rankofAll);
         console.log(suitofAll);
     }
     quickDebugShow(){
        let current = new String();
         for (var i=0;i<this.currentHand.length;i++){
             let suit, rank;
             if(this.currentHand[i].suit == 'C')    suit = 'Club';
             else if(this.currentHand[i].suit == 'D')    suit = 'Diamond';
             else if(this.currentHand[i].suit == 'H')    suit = 'Heart';
             else suit = 'Spade';
             if(this.currentHand[i].rank == 11) rank = 'J';
             else if(this.currentHand[i].rank == 12) rank = 'Q';
             else if(this.currentHand[i].rank == 13) rank = 'K';
             else if(this.currentHand[i].rank == 14) rank = 'A';
             else rank = this.currentHand[i].rank
             current+=`${suit} ${rank}`.padEnd(20, ' ');
         }
        // console.log(current);                                // instead of just output in console, we can return it as string
        return current;
     }
 }

 module.exports = Hand;


 /* -------------   The following are for test only --------------  */
 /*
 var testhand = new Hand();
 testhand.Add(new Card('H', 5));
 testhand.Add(new Card('S', 7));
 testhand.Add(new Card('D', 13));
 testhand.Add(new Card('C', 11));
 testhand.Add(new Card('C', 4));
 testhand.debugShow();

 var otherhand = new Hand();
 otherhand.Add(new Card('C', 7));
 otherhand.Add(new Card('C', 2));
 otherhand.Add(new Card('D', 2));
 otherhand.Add(new Card('C', 3));
 otherhand.Add(new Card('H', 9));
 console.log(otherhand.GetCardsByRank(2));
 console.log(otherhand.GetCardsByRank(1));
 console.log(otherhand.GetCardsBySuit('S'));
 console.log(otherhand.GetCardsBySuit('C'));
 console.log(otherhand.GetCardByRankAndSuit(7, 'C'));
 console.log(otherhand.GetCardByRankAndSuit(9, 'C'));
*/

 