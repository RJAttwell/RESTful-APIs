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

///REQUESTS TARGETING ALL ARTICLES///

//Get, post and delete will start with a . to show they are chained methods
//Use the app.route to refactor our code
app
  .route("/articles")

  .get(function (req, res) {
    //Query database
    //Go through articles and find everything in there, once it's done it'll trigger the then section and log our foundArticles
    Article.find({}).then(function (foundArticles) {
      res.send(foundArticles);
    });
  })

  .post(function (req, res) {
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
  })

  .delete(function (req, res) {
    Article.deleteMany({}).then(function () {
      res.send("Successfully deleted all articles");
    });
  });

///REQUESTS TARGETING A SPECIFIC ARTICLE///

app
  .route("/articles/:articleTitle")

  .get(function (req, res) {
    //When a user makes a get request, we'll tap into the params parsed in with the get request
    //and the name of the variable. That'll be the search condition. The code will then look for one document
    //where the title is equal to the one in the request parameters (article title)
    Article.findOne({ title: req.params.articleTitle }).then(function (
      foundArticle
    ) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  })

  .put(async (req, res) => {
    //Use the update method from MongoDB
    try {
      const updatedArticle = await Article.updateOne(
        //condition
        { title: req.params.articleTitle },
        //what gets updated
        { title: req.body.title, content: req.body.content }
        //set this property to be true so the entire document gets overwrited by what is specified
        // { overwrite:true }
      );
      res.status(200).send("Document successfully updated");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    //When you search for an article using the PUT method in Postman, this code will look for an article
    //with a matching title and replace the title and content with a new title/content specified in Postman
  })

  //If you don't want to replace the entire document, you can use a PATCH request
  .patch(async (req, res) => {
    try {
      const updatedArticle = await Article.updateOne(
        { title: req.params.articleTitle },
        //If you want to update just a certain field and not the whole document, we can use $set
        //Body Parser will parse the request and pick out the fields we've provided updates to
        { $set: req.body }
      );

      res.status(200).send("Fields have been successfully updated");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }).then(function () {
      res.send("Successfully deleted the article");
    });
  });

//Starts server on port 3000
app.listen(3000, function () {
  console.log("Server has now been started on port 3000");
});
