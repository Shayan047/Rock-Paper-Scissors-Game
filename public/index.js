const randomSign = ["Paper", "Scissors", "Rock"];
var resultText = "";
var score = 0;
var chances = 5;
let rulesTab = false, scoresTab = false;
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
            }
            else {
                resultText = "you lose";
            }
        }
        else if(userSign === "Rock") {
            if(comSign === "Scissors") {
                resultText = "you win";
            }
            else {
                resultText = "you lose";
            }
        }
        else if(userSign === "Scissors") {
            if(comSign === "Paper") {
                resultText = "you win";
            }
            else {
                resultText = "you lose";
            }
        }

        if(resultText === "you win") {
            score ++;
            $("span").text("Score +1");
        }
        else if(resultText === "you lose") {
            chances--;
            $("span").text("Chances -1");
        }

        setTimeout(function() {
            $(".result").toggleClass("show");
            $(".score h1").text(score);
            $(".chances h1").text(chances);
        }, "500");

        $(".result h1").text(resultText);

        setTimeout(function() {

            if(chances === 0) {
                $(".back-drop").css({"visibility": "visible"});
                $(".game-over").css({"visibility": "visible", "animation": "pop-up 0.3s"});
                $.ajax({
                    url: "/retrieve/post",
                    type: "POST",
                    data: {
                        player: $(".rectangle > div:nth-child(1) h1").text(),
                        score: score
                    }
                });
            };

        }, "1500")

    }, "500");
};


$(document).ready(function() {
    $(".chances h1").text(chances);

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
        if(scoresTab != true) {
            $(".rules-popup").toggleClass("popup");
            rulesTab = !rulesTab;
        }
    });

    $(".high-scores").click(function() {
        if(rulesTab != true) {
            $.ajax({
                url: "/retrieve/get",
                type: "GET",
                success: function(results) {
                    $(".scores-popup").html("");
                    results.slice(0, 5).forEach(function(result) {
                        $(".scores-popup").append('<div class="gradient-color"><h1>'+result.name+'</h1><p>'+result.score+'</p></div>');
                    });
                }
            });
    
            $(".scores-popup").toggleClass("popup");
            scoresTab = !scoresTab;
        }
        
    });
});

