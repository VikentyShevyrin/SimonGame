const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

// Detect which button was pressed and save it's value into array
$(".btn").click(function (e) {
    let userChosenColor = e.target.id;
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $(".heading-text").text("Level " + level);
    $(".subheading-text").text("Repeat the sequence");
    level++
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    let lastColor = userChosenPattern.length - 1;
    if (userChosenPattern[lastColor] !== gamePattern[lastColor]) {
        console.log("user pattern" + userChosenPattern);
        console.log("game pattern" + gamePattern);
        console.log("fail");
        $("body").addClass('game-over')
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
        $(".heading-text").text("Game Over!");
        $(".subheading-text").text("Press a key to restart");
        playSound("wrong");

        // Reinitialize the game and start over
        gamePattern = [];
        userChosenPattern = [];
        level = 0;
        return started = false;
    }
    // If user patter matches game patter, start next sequence
    if (userChosenPattern.length === gamePattern.length) {
        userChosenPattern = [];
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}
