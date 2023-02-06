const randomSign = ["Paper", "Scissors", "Rock"];
var resultText = "";
var score = 0;

const generateComSign = () => {
    return randomSign[Math.floor(Math.random() * 3)];
};

const result = (userSign, comSign) => {
    $("span").text("");
    $(".signs").toggleClass("hide");
    $(".play").toggleClass("show");
    $(".chosenSign").attr("src", "images/" + userSign + ".png");

    setTimeout(function() {
        $(".comSign").toggleClass("show");
        $(".randomSign").attr("src", "images/" + comSign + ".png");
        
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

        if(resultText === "you win") $("span").text("+1");
        else if(resultText === "you lose" && score > 0) $("span").text("-1");

        setTimeout(function() {
            $(".result").toggleClass("show");
            $(".score h1").text(score);
        }, "500");

        $(".result h1").text(resultText);

    }, "500")
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
        $(".comSign").toggleClass("show");
        $(".result").toggleClass("show");
    });

    $(".rules").on("click", function() {
        $(".rules-popup").toggleClass("popup");
    });

    $(".rules-nav img").on("click", function() {
        $(".rules-popup").toggleClass("popup");
    });

});

