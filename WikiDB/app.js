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
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function (req, res) {
  //Query database
  //Go through articles and find everything in there, once it's done it'll trigger the then section and log our foundArticles
  Article.find({}).then(function (foundArticles) {
    res.send(foundArticles);
  });
});

app.post("/articles", function (req, res) {
  //req.body contains key-value pairs of data submitted in the request body.
  //Can tap into a variable name

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });

  newArticle
    .save()
    .then(function (error) {
      res.send(error);
    })
    .catch(function () {
      res.send("Successfully added a new article!");
    });
});

app.delete("/articles", function (req, res) {
  Article.deleteMany({}).then(function(){
    res.send("Successfully deleted all articles");
  });

});

//Starts server on port 3000
app.listen(3000, function () {
  console.log("Server has now been started on port 3000");
});
