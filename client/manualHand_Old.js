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
    $("#communityNumber").change(CommunityCardsChanged);
    $("#playersNumber").change(PlayersNumberChanged);
    $("#pocketNumber").change(PocketNumberChanged);
});
/**
 * ---------- Event listeners -------------------
 */
function CommunityCardsChanged(){
    CommunityCardNumer = Number(this.value);
    if(CommunityCardNumer == 0){
        $("div.communityCardsSelectionBlock").empty();
        $("#PlayersContainer").empty();
        $("#playersNumber").attr("disabled", "true");
        $("#playersNumber").val(0);
        $("#pocketNumber").attr("disabled", "true");
        $("#pocketNumber").val(0);
    }
    else{
        var element = "";
        for (var i=0;i<CommunityCardNumer;i++){
            element += "<img src='images/NULL.png'>";
        }
        $("div.communityCardsSelectionBlock").html(element);
        $("div.communityCardsSelectionBlock>img").each(function(){
            $(this).click(PocketCardClicked);
            $(this).hover(PocketCardHoverIn, PocketCardHoverOut);
        });
        $("#playersNumber").removeAttr("disabled");
    }
}

function PlayersNumberChanged(){
    PlayersNumber = Number(this.value);
    if(PlayersNumber == 0){
        $("#PlayersContainer").empty();
        $("#pocketNumber").attr("disabled", "true");
        $("#pocketNumber").val(0);
    }
    else{
        var element = "";
        for(var i=0; i<PlayersNumber;i++){
            element += "<div id='player"+(i+1)+"' class='pocketsForPlayer'><h2 class='header'>Player"+(i+1)+"'s Pocket Cards</h2><div class='content'></div></div>"
        }
        $("#PlayersContainer").html(element);
        $("#pocketNumber").removeAttr("disabled");
    }
}

function PocketNumberChanged(){
    PocketNumber = Number(this.value);
    if(PocketNumber == 0){
        $("#PlayersContainer>div.pocketsForPlayer>div.content").each(function(){
            $(this).empty();
        });
    }
    else{
        $("#PlayersContainer>div.pocketsForPlayer>div.content").each(function(index){
            var element = "";
            for(var i=0; i<PocketNumber; i++){
                element += "<img src='images/NULL.png'>";
            }
            $(this).html(element);
            $(this).children("img").each(function(){
                $(this).click(PocketCardClicked);
                $(this).hover(PocketCardHoverIn, PocketCardHoverOut);
            });
        });
    }
}

function PocketCardHoverIn(){
    this.src = "images/Hover.png"
}
function PocketCardHoverOut(){
    this.src = "images/NULL.png"
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
    var index = 0;
    for(var key in Cards){
        index ++;
       // $("#Selections>div.content").append("<img id='selectionCard_"+index+"' src='images/"+key + ".png'>");
    }
}

function ConfirmSelect(){

}
function RestSelect(){
    
}
function CloseSelect(){
    $("#Selections").remove();
}