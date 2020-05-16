var express = require('express'); // NodeJS framework - designed for building web applications and APIs
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http) // It enables realtime, bi-directional communication between web clients and servers.
var process = require('process'); // Communication with the terminal

app.use(express.static(__dirname));

var server = http.listen(8000, () => {
    console.log("Server is listening on port ", server.address().port)
})

var playerOneChoice;
var playerTwoChoice;
var numberOfPlayers;

function assignChoiceObjectFromString(stringOfChoice) {
    if (stringOfChoice === "Rock") {
        return {object:"Rock", beats:"Scissors", losesTo:"Paper"};
    } else if (stringOfChoice === "Paper") {
        return {object:"Paper", beats:"Rock", losesTo:"Scissors"};
    } else return {object:"Scissors",beats:"Paper", losesTo:"Rock"};
}

function results(playerOneChoice, playerTwoChoice) {
    
    if (playerOneChoice.object == playerTwoChoice.object) {
        $("#winner").text("It's a draw!");
    } else if (playerOneChoice.beats == playerTwoChoice.object) {
        $("#winner").text("Player one!");
    } else $("#winner").text("Player two!");
}

function rockChoice() {
    $("#choice").text("Rock");
    $("#submitChoice").removeAttr("disabled");
    $("#submitChoice").show();
}

function paperChoice() {
    $("#choice").text("Paper");
    $("#submitChoice").removeAttr("disabled");
    $("#submitChoice").show();
}
function scissorChoice() {
    $("#choice").text("Scissors");
    $("#submitChoice").removeAttr("disabled");
    $("#submitChoice").show();
}

function submitChoice() {
    if(playerOneChoice === undefined){
        playerOneChoice = assignChoiceObjectFromString($("#choice").text());
        $("#choice").text("");
        $("#playerOne").hide();
        $("#submitChoice").hide();

        if(numberOfPlayers == 1){ 
            var choices = ["Rock", "Paper", "Scissors"]
            playerTwoChoice = assignChoiceObjectFromString(choices[Math.floor(Math.random()* choices.length)]);
            $("#choiceSelection").hide();
            results(playerOneChoice, playerTwoChoice);
            $("#results").show();
        } else {
            $("#playerTwo").show();
        }

    } else {
        playerTwoChoice = assignChoiceObjectFromString($("#choice").text());
        $("#choiceSelection").hide();
        results(playerOneChoice, playerTwoChoice);
        $("#results").show();
    }
}

function setNumberOfPlayers(numOfPlayers) {
    numberOfPlayers = numOfPlayers;
    $("#howManyPlayers").hide();
    $("#startGame").show();
}

function playAgain() {
    playerOneChoice = undefined;
    playerTwoChoice = undefined;
    $("#results").hide();
    $("#choiceSelection").show();
    $("#playerTwo").hide();
    $("#playerOne").show();
    

}




    //TODO Give Player one and Player two names
    //TODO Create a Score
    //TODO Create API's to get the average win for each choice
