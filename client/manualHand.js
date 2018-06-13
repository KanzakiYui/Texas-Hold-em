/**
 * Global Variables
 */
var CommunityCardNumer = 0;
var PlayersNumber = 0;
var PocketNumber = 0;
var Cards = {
    "2C": -1, "2D": -1, "2H": -1, "2S": -1,
    "3C": -1, "3D": -1, "3H": -1, "3S": -1,
    "4C": -1, "4D": -1, "4H": -1, "4S": -1,
    "5C": -1, "5D": -1, "5H": -1, "5S": -1,
    "6C": -1, "6D": -1, "6H": -1, "6S": -1,
    "7C": -1, "7D": -1, "7H": -1, "7S": -1,
    "8C": -1, "8D": -1, "8H": -1, "8S": -1,
    "9C": -1, "9D": -1, "9H": -1, "9S": -1,
    "10C": -1, "10D": -1, "10H": -1, "10S": -1,
    "JC": -1, "JD": -1, "JH": -1, "JS": -1,
    "KC": -1, "QD": -1, "QH": -1, "QS": -1,
    "QC": -1, "KD": -1, "KH": -1, "KS": -1,
    "AC": -1, "AD": -1, "AH": -1, "AS": -1
}
/**
 * Initial Event Bindings
 */
$(function(){
    
});
/**
 * ---------- Event listeners -------------------
*/
function ConfirmSetting(){
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
    var value = $(this).data("value");
    this.src = "images/"+value+".png";
}

function PocketCardClicked(){
    var parentElement =
`
<div id="Selections" class="None">
    <h2 class="header">Assgin Card to This Position</h2>
    <div class="content">
    
    </div>
    <div class="footer">
        <button class="confirm" onClick="ConfirmSelect()" >Confirm</button>
        <button class="reset" onClick="RestSelect()" >Reset</button>
        <button class="close" onClick="CloseSelect()" >Close</button>
    </div>
    <div class="WholeBackGround">

    </div>
</div>
`;
    $("body").append(parentElement);
    var images = "";
    for(var key in Cards){
        $("#Selections>div.content").append("<img src='images/"+key + ".png'>");
    }
}

function ConfirmSelect(){

}
function RestSelect(){
    
}
function CloseSelect(){
    $("#Selections").remove();
}