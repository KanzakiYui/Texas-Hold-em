/** Class Card is the basic instance with extendable information of each poker card  */
class Card {
    /**
     * Card's constructor is used to initial all necessary information when we define a poker card
     * @param {string} suit - typically, suit is supposed to be one of {'Club', 'Diamond', 'Heart', 'Spade'}
     * @param {int} rank - typically, rank is supposed to be one of {2, 3, ..., 14} where 11 is 'J', 12 is 'Q', 13 is 'K' and 14 is 'A'
     * @param {JSON} remains - A json formatted object which can flexibly store any other information of poker card with key-value pair format. This property allows this Card class extendable
     */
    constructor(suit, rank, remains=null){
        this.suit = suit;
        this.rank = rank;
        for (var key in remains)
            this[key] = remains[key];
    }
    /**
     * GetSuitAndRank function is used to quickly get two main properties (suit and rank) of Card instance
     * @return {string} a string represents both suit and rank
     */
    GetSuitAndRank(){
        var rank = this.rank;
        /**
         * The following may adjust depends on requirement
         */
        if(rank == 11) rank = "J";
        else if(rank == 12) rank = "Q";
        else if(rank == 13) rank = "K";
        else if(rank == 14) rank = "A";
        return `${this.suit} ${rank}`;
    }
    /**
     * GetAllProperties function is used to quickly get all properties this Card instance currently has
     * @return {string} a string represents all properties
     */
    GetAllProperties(){
        var allProperties = Object.getOwnPropertyNames(this);
        var result = "\n";
        allProperties.forEach(propertyName=>{
            result+=`${propertyName}: ${this[propertyName]}\n`;
        });
        return result;
    }
}
/**
 * Card module is exported with Card class definition.
 * @module Card
 * @type {Card}
 */
module.exports = Card;

/*  -----------     The following are for test only         -------     */
/*
var card1 = new Card('Spade', 7);
console.log(card1.GetSuitAndRank());
console.log(card1.GetAllProperties());
var card2 = new Card('Club', 11, {isPocket: true, playerNumber: 'Player3', cardPosition: 2});
console.log(card2.GetSuitAndRank());
console.log(card2.GetAllProperties());
*/