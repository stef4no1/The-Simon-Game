let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Nivel " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {
        playSound("Equivocado");
        $("body").addClass("game-over");
        $("#level-title").text("Perdiste!, apretá otra tecla para empezar de nuevo");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Nivel " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}