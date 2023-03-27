const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Allows EJS to look inside the views folder
app.set("view engine", "ejs");

//Commands that allow us to use body-parser and EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect to Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
  useNewUrlParser: true,
});

// ====================================================================================================================================================================================

//SCHEMA AND MODEL

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
  });

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
    //Query database
    //Go through articles and find everything in there, once it's done it'll trigger the then section and log our foundArticles
    Article.find({}).then(function(foundArticles){
        res.send(foundArticles);
    });
});

//Starts server on port 3000
app.listen(3000, function(){
    console.log("Server has now been started on port 3000")
});