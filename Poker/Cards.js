var Card = require("./Card");
/*
 * Global Variable:   Cards
 * This Class holds 52 different instances of Card. Here we do not need Singleton Pattern in
 * JavaScript language, instead, using Module Pattern is quite enough
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

module.exports = Cards;