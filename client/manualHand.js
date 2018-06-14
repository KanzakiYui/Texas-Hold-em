/**
 * Global Variables
 */
var response = new Object();
var CommunityCardNumer = 0;
var PlayersNumber = 0;
var PocketNumber = 0;
var Cards = {
    "2C": true, "2D": true, "2H": true, "2S": true,
    "3C": true, "3D": true, "3H": true, "3S": true,
    "4C": true, "4D": true, "4H": true, "4S": true,
    "5C": true, "5D": true, "5H": true, "5S": true,
    "6C": true, "6D": true, "6H": true, "6S": true,
    "7C": true, "7D": true, "7H": true, "7S": true,
    "8C": true, "8D": true, "8H": true, "8S": true,
    "9C": true, "9D": true, "9H": true, "9S": true,
    "10C": true, "10D": true, "10H": true, "10S": true,
    "JC": true, "JD": true, "JH": true, "JS": true,
    "KC": true, "QD": true, "QH": true, "QS": true,
    "QC": true, "KD": true, "KH": true, "KS": true,
    "AC": true, "AD": true, "AH": true, "AS": true,
    "NULL": true
}
var currentElementNeedAssginment = null;
var currentSelectionIDofCardInSelection = -1;
/**
 * Initial Event Bindings
 */
$(function(){
    
});
/**
 * ---------- Event listeners -------------------
*/
function ConfirmSetting(){
    $("#Calculate>button").attr("disabled", true);
    for(var key in Cards)
        Cards[key] = true;
    $("#BestHandContainer").empty();
    $("#finalResult>h3").remove();
    CommunityCardNumer = $("#CommunityCardSetting").val();
    PlayersNumber = $("#PlayerNumberSetting").val();
    PocketNumber = $("#PocketCardSetting").val();
    // community
    var element = "";
    for(var i=0; i<CommunityCardNumer; i++){
        element += "<img src='images/NULL.png'>";
    }
    $("#CommunityCardContainer>div.content").html(element);
    // players
    element = "";
     for(var i=0; i<PlayersNumber;i++){
        element += "<div id='player"+(i+1)+"' class='pocketsForPlayer'><h3 class='header'>Player"+(i+1)+"'s Pocket Cards</h3><div class='content'></div></div>"
    }
    $("#PlayersContainer").html(element);
    // each player
    $("#PlayersContainer>div.pocketsForPlayer>div.content").each(function(index){
        var element = "";
        for(var i=0; i<PocketNumber; i++){
            element += "<img src='images/NULL.png'>";
        }
        $(this).html(element);
    });
    $("img").each(function(){
        $(this).hover(PocketCardHoverIn, PocketCardHoverOut);
        $(this).data("value", "NULL");
        $(this).click(PocketCardClicked);
    });
}

function PocketCardHoverIn(){
    this.src = "images/Hover.png"
}
function PocketCardHoverOut(){
    this.src = ImageValueToSrc($(this).data("value"));
}

function PocketCardClicked(){
    currentElementNeedAssginment = this;
    var parentElement =
`
<div id="Selections" class="None">
    <h2 class="header">Assgin Card to This Position</h2>
    <div class="content">
    
    </div>
    <div class="footer">
        <button class="confirm" onClick="ConfirmSelect()" >Confirm</button>
        <button class="close" onClick="CloseSelect()" >Close</button>
    </div>
    <div class="WholeBackGround">

    </div>
</div>
`;
    $("body").append(parentElement);
    var images = "";
    var index = 0;
    for(var key in Cards){
        if(Cards[key]||key == 'NULL')
            $("#Selections>div.content").append("<img id='selectionCard_"+index+"' src='images/"+key + ".png' onClick='SelectedACard(event)'>");
        else
            $("#Selections>div.content").append("<img id='selectionCard_"+index+"' src='images/"+key + ".png' class='Used'>");
        index ++;
    }
}

function SelectedACard(event){
    var element = event.target;
    if(currentSelectionIDofCardInSelection != -1)
        $("#Selections>div.content>img").eq(currentSelectionIDofCardInSelection).removeClass("Selected");
    currentSelectionIDofCardInSelection = Number(element.id.split("_").pop());
    $("#Selections>div.content>img").eq(currentSelectionIDofCardInSelection).addClass("Selected");
}

function ConfirmSelect(){
    if(currentSelectionIDofCardInSelection != -1){
        var oldSrc = $(currentElementNeedAssginment).attr("src");
        if(oldSrc !="NULL"){
            Cards[ImageSrcToValue(oldSrc)] = true;
        }
        var src = $("#Selections>div.content>img.Selected").attr("src");
        currentElementNeedAssginment.src = src
        $(currentElementNeedAssginment).data("value", ImageSrcToValue(src));
        Cards[ImageSrcToValue(src)] = false;
    }
    currentSelectionIDofCardInSelection = -1;
    $("#Selections").remove();
    CheckIfCalculationIsAvailable();
}

function CloseSelect(){
    currentSelectionIDofCardInSelection = -1;
    $("#Selections").remove();
}

function CheckIfCalculationIsAvailable(){
    var unassignedCardsNumber = $("img[src='images/NULL.png']").length;
    if(unassignedCardsNumber == 0)
        $("#Calculate>button").removeAttr("disabled");
}

function Calculate(){
    var communityArray = new Array();
    $("#CommunityCardContainer>div.content>img").each(function(){
        communityArray.push(ImageValueToJSON(ImageSrcToValue($(this).attr("src"))));
    });
    var pocketArray = new Array(PlayersNumber);
    for (var i=0;i<PlayersNumber;i++)
        pocketArray[i] = new Array();
    $("#PlayersContainer>div.pocketsForPlayer>div.content>img").each(function(index){
        pocketArray[Math.floor(index/PocketNumber)].push(ImageValueToJSON(ImageSrcToValue($(this).attr("src"))));
    });
    var result = {
        "communityCards": communityArray,
        "pocketCardsArray": pocketArray
    };
    result = JSON.stringify(result);
    // Ajax Post
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response =JSON.parse(this.responseText);
            console.log(response);
            AssignmentShow();
        }
    };
    XHR.open("POST", "ManualAssignment", true);
    XHR.setRequestHeader("Content-type", "application/json");
    XHR.send(result);
}

function AssignmentShow (){
    var element = "";
    for(var i=0; i<PlayersNumber;i++)
        element +=
`
<div class="besthand">
    <h3 class="header">Player${i+1}'s Best Hand</h3>
    <div class="content">
                
    </div>
    <h3 class="rankResult"></h3>
</div>
`;
    $("#BestHandContainer").html(element);
    var result = response["bestHandsInfo"];
    $("div.besthand>div.content").each(function(index){
        var bestHand = result[index+1]['besthand'];
        for(var i=0; i<5; i++){
            var eachCard = bestHand.slice(20*i, 20*i+20).trimEnd();
            var filename = "images/"+GetImageName(eachCard)+".png";
            $(this).append("<img src='"+filename+"'>");
        }
    });
    $("div.besthand>h3.rankResult").each(function(index){
        var bestRank = result[index+1]['bestrank'];
        $(this).text(bestRank);
    });
    $("#finalResult").html(`<h3>${response["result"]}</h3>`);
}

/**
 * Support funtions
 */
function ImageSrcToValue(src){
    return src.slice(7, -4);
}

function ImageValueToSrc(value){
    return "images/"+value+".png"
}

function ImageValueToJSON(value){
    var suit = value.slice(-1);
    var rank = value.slice(0,-1);
    if(suit == 'C') suit = "Club";
    else if(suit == 'D') suit = "Diamond";
    else if(suit == 'H') suit = "Heart";
    else suit = "Spade";
    if(rank == 'J') rank = 11;
    else if(rank == 'Q') rank = 12;
    else if(rank == 'K') rank = 13;
    else if(rank == 'A') rank = 14;
    else rank = Number(rank);
    return {"suit": suit, "rank": rank}
}

function GetImageName(name){
    var nameArray = name.split(" ");
    var suit = nameArray[0];
    var rank = nameArray[1];
    if(suit == "Club")    
        suit = "C"
    else if(suit == "Diamond")
        suit = "D"
    else if(suit == "Heart")
        suit = "H"
    else 
        suit = "S"
    return rank+suit;
}
