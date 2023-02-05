const randomSign = ["paper", "scissors", "rock"];
var resultText = "";
var score = 0;

const generateComSign = () => {
    return randomSign[Math.floor(Math.random() * 3)];
};

const result = (userSign, comSign) => {
    $(".signs").toggleClass("hide");
    $(".play").toggleClass("show");
    $(".chosenSign").attr("src", "images/" + userSign + ".png");
    $(".result").toggleClass("hide");
    $(".comSign").toggleClass("hide");

    setTimeout(function() {

        $(".result").toggleClass("hide");
        $(".comSign").toggleClass("hide");
        $(".randomSign").attr("src", "images/" + comSign + ".png");

        
        if(userSign === comSign) {
            resultText = "Draw";
        }
        else if(userSign === "paper") {
            if(comSign === "rock") {
                resultText = "you win";
                score ++;
            }
            else {
                resultText = "you lose";
                if(score > 0) score--;
            }
        }
        else if(userSign === "rock") {
            if(comSign === "scissors") {
                resultText = "you win";
                score ++;
            }
            else {
                resultText = "you lose";
                if(score > 0) score--;
            }
        }
        else if(userSign === "scissors") {
            if(comSign === "paper") {
                resultText = "you win";
                score ++;
            }
            else {
                resultText = "you lose";
                if(score > 0) score--;
            }
        }

        $(".score h1").text(score);
        $(".result h1").text(resultText);

    }, "1000")
}


$( document ).ready(function() {

    $(".sign").on("click", function(event) {
        const userSign = $(this).attr("id");
        const comSign = generateComSign();
        result(userSign, comSign);
    });

    $(".result button").on("click", function() {
        $(".signs").toggleClass("hide");
        $(".play").toggleClass("show");
    });

    $(".rules").on("click", function() {
        $(".rules-popup").toggleClass("popup");
    });

    $(".rules-nav img").on("click", function() {
        $(".rules-popup").toggleClass("popup");
    });

});

