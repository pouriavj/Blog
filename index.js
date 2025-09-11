import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  
  res.render("index.ejs" , {allPosts : posts , date : new Date().toLocaleDateString('en-US' , options)  });
});

app.get("/dashboard", (req, res) => {
  
  res.render("dashboard.ejs" , {allPosts : posts , date : new Date().toLocaleDateString('en-US' , options) });
});

app.get("/post1", (req, res) => {
  
  res.render("post1.ejs");
});
app.get("/post2", (req, res) => {
  
  res.render("post2.ejs");
});

app.post("/dashboard", (req, res) => {
  posts.push({title : req.body.text , essay : req.body.textarea});
  
  res.render("dashboard.ejs" , {allPosts : posts , date : new Date().toLocaleDateString('en-US' , options) });
  

});
app.post("/delete", (req, res) => {
  posts.splice(req.body.delete , 1);
  
  res.render("dashboard.ejs" , {allPosts : posts , date : new Date().toLocaleDateString('en-US' , options) });
  
  
});
app.post("/edit", (req, res) => {
  var i = req.body.edit;
  res.render("edit.ejs" , {postEdit : posts[i] , index : i});
  
  
});
app.post("/editPost", (req, res) => {
  posts[req.body.editPublish].title = req.body.text ;
  posts[req.body.editPublish].essay = req.body.textarea ;
  res.render("dashboard.ejs" , {allPosts : posts , date : new Date().toLocaleDateString('en-US' , options) });
  
  
  
  
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
