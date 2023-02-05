const randomSign = ["Paper", "Scissors", "Rock"];
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
        console.log(comSign + userSign);
        
        if(userSign === comSign) {
            resultText = "draw";
        }
        else if(userSign === "Paper") {
            if(comSign === "Rock") {
                resultText = "you win";
                score ++;
            }
            else {
                resultText = "you lose";
                if(score > 0) score--;
            }
        }
        else if(userSign === "Rock") {
            if(comSign === "Scissors") {
                resultText = "you win";
                score ++;
            }
            else {
                resultText = "you lose";
                if(score > 0) score--;
            }
        }
        else if(userSign === "Scissors") {
            if(comSign === "Paper") {
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

