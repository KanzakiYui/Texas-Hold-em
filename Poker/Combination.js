/**
 * Combination function is in mathematical meaning.  Give n options, select k options of them, return all of C(n, k) results
 * @param {object[]} arrayAvailable - An array of any kind of variables available for selection
 * @param {int} numberNeeds - How many members of given array should be selected
 * @return {object[]} All possible combination of result
 */
 function Combination(arrayAvailable, numberNeeds){
    var finalResult = new Array();                                              // This actually should be a two-dimension array, each member of this array should be an array represent a possible combination of given objects
    var currentCombination = new Array();                            // This is an array of currentCombination, it will keep replacing when we run inner function
    function findNextIntoCombination(arrayNow, numberStillNeeds){
        if(numberStillNeeds == 0){
            /*
                 When numberStillNeeds is 0, which means we have selected enough item into currentCombination array, 
                 just store it and return
            */
            finalResult.push(currentCombination.slice(0))         // store a shallow copy of currentCombination instead of a reference of currentCombination itself since currentCombination will keep change and we do NOT want the change affects what we have stored previously
            return
        }
        for(var i=0;i<=arrayNow.length-numberStillNeeds; i++){
            /* 
                For example, if current array only has 3 objects, and we still needs 2, then we just need to 
                consider first (3-2)+1 = 2 objects, because for the first 2 objects, we must select at least one.
            */
            currentCombination[numberNeeds-numberStillNeeds] = arrayNow[i];     // currently we select for (numberNeeds-numberStillNeed+1)th object for currentCombination
            findNextIntoCombination(arrayNow.slice(i+1), numberStillNeeds-1);       // slice(i+1) means we cut off what already has been processed.
        }
    }
    findNextIntoCombination(arrayAvailable, numberNeeds);
    return finalResult;
 }

 /**
 * Combination module is exported with Hand class definition.
 * @module Combination
 * @type {function}
 */
module.exports = Combination;

 /* -------------   The following are for test only --------------  */
 /*
var test = [1, 2, 3, 4, 5, 6, 7];
var result =Combination(test, 5);
for(var i=0; i<result.length; i++)
    console.log(result[i]);
*/

