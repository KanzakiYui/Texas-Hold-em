var response = new Object();

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

function Assignment(){
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response =JSON.parse(this.responseText);
            console.log(response);
            AssignmentShow();
        }
    };
    XHR.open("POST", "Assignment", true);
    XHR.setRequestHeader("Content-type", "application/json");
    var globalSetting = new Object();
    globalSetting["playerNumbers"] = Number($("#PlayerNumberSetting").val());
    globalSetting["poketCardsNumber"] = Number($("#PocketCardSetting").val());
    globalSetting["communityCardsNumber"] = Number($("#CommunityCardSetting").val());
    globalSetting["minmumShuffleTimes"] = Number($("#ShuffleTimeSetting").val());
    XHR.send(JSON.stringify(globalSetting));
}

function AssignmentShow(){
    var playerNum = Number($("#PlayerNumberSetting").val());
    for(var i=1;i<=playerNum;i++){
        var pocket = response["assignResult"][i].split("\t\t");
        pocket.pop();
        var element = $("#Player"+i+">div.content");
        element.empty();
        for(var j=0; j<pocket.length;j++){
            var filename = "images/"+GetImageName(pocket[j])+".png";  
            element.append("<img src='"+filename+"'>");
        }
    }
    var community = response["assignResult"]["Community"].split("\t\t");
    community.pop();
    var element = $("#CommunityCard>div.content");
    element.empty();
    for(var j=0; j<community.length;j++){
        var filename = "images/"+GetImageName(community[j])+".png";  
        element.append("<img src='"+filename+"'>");
    }
}

function Calculate(){
    if(Object.keys(response).length != 0){
        var playerNum = Number($("#PlayerNumberSetting").val());
        for(var i=1;i<=playerNum;i++){
            var bestHand = response["bestHandsInfo"][i]['besthand'];
            var bestRank = response["bestHandsInfo"][i]['bestrank'];
            var element = $("#Player"+i+"Best>div.content");
            element.empty();
            for(var j=0;j<5;j++){
                var eachCard = bestHand.slice(20*j, 20*j+20).trimEnd();
                var filename = "images/"+GetImageName(eachCard)+".png";  
                element.append("<img src='"+filename+"'>");
            }
            $("#Player"+i+"Best>div.rank").text(bestRank);
        }
        $("#Result").text(response["result"]);
    }
}

function Clear(){
    for(var i=1; i<=6; i++){
        $("#Player"+i+">div.content").empty();
        $("#Player"+i+"Best>div.content").empty();
    }
    $("#CommunityCard>div.content").empty();
    $("#Result").empty();
}