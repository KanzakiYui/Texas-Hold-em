/*
 * Class:   Card
 * An instance of this class indicate a poker card with several properties
 * 1. Initial params
 *      1.1 suit            
 *          string, usually 'C', 'D', 'H' or 'S'
 *      1.2 rank            
 *          number, from 2 to 14 ( J = 11, Q = 12, K = 13, A = 14)
 *      1.3 remains:    
 *          array of JSON format objects, any other properties needs to be initialized 
 *          in a poker card, depends on requirement
 *  2. Methods
 *      2.1 debugShow()   
 *          give developers a basic understand of all properties this instance has
 */
class Card {
    constructor(suit, rank, remains=null){
        this.suit = suit;
        this.rank = rank;
        if(remains)
            remains.forEach(property => {
                this[property.key] = property.value
            });
    }
    debugShow(){
        var allProperties = Object.getOwnPropertyNames(this);
        var result = "This card has info of:\n";
        allProperties.forEach(propertyName=>{
            result+=`${propertyName}: ${this[propertyName]}\n`;
        });
        console.log(result);
    }
}

module.exports = Card;

/*  -----------     The following are for test only         -------     */
