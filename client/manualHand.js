$(function(){
    $("#communityNumber").change(CommunityCardsChanged);
    $("#playersNumber").change(PlayersNumberChanged);
    $("#pocketNumber").change(PocketNumberChanged);
});
/**
 * Global Variables
 */
var CommunityCardNumer = 0;
var PlayersNumber = 0;
var PocketNumber = 0;

function CommunityCardsChanged(){
    CommunityCardNumer = Number(this.value);
    if(CommunityCardNumer == 0){
        $("div.communityCardsSelectionBlock").empty();
    }
    else{
        var element = "";
        for (var i=0;i<CommunityCardNumer;i++){
            element += "<img src='images/NULL.png'>";
        }
        $("div.communityCardsSelectionBlock").html(element);
    }
}

function PlayersNumberChanged(){
    PlayersNumber = Number(this.value);
    if(PlayersNumber == 0){
        $("#PlayersContainer").empty();
    }
    else{
        var element = "";
        for(var i=0; i<PlayersNumber;i++){
            element += "<div id='player"+(i+1)+"' class='pocketsForPlayer'><h2 class='header'>Player"+(i+1)+"'s Pocket Cards</h2><div class='content'></div></div>"
        }
        $("#PlayersContainer").html(element);
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
        });
    }
}
