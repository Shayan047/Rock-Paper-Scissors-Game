const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


mongoose.set("strictQuery", false);
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/rpsDB");


let currentPlayer, newScore;

const playerSchema = new mongoose.Schema({
    name: String,
    score: Number
});

const Player = mongoose.model("Player", playerSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/:user", function(req, res) {
    res.render("game", {player: req.params.user});
})

app.post("/", function(req, res) {
    playerName = req.body.playerName;

    Player.findOne({name: playerName}).then(result => {
        if(!result) {
            const player = new Player({
                name: playerName,
                score: 0
            });

            player.save();
        }
    });
    res.redirect("/" + playerName);
});

app.get("/retrieve/get", function(req, res) {

    Player.find().sort({ score: -1 }).exec((err, score) => {
        if(!err) res.send(score);
      });

});

app.post("/retrieve/post", function(req, res) {

    currentPlayer = req.body.player;
    newScore = Number(req.body.score);
    
});

app.post("/new-game", function(req, res) {
    Player.findOneAndUpdate({name: currentPlayer}, {score: newScore}, function(err, updatedScore) {
        if(!err) res.redirect("/");
    })
});


app.listen(3000, function() {
    console.log("Server is up!");
});
