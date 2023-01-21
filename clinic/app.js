const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
// let details = [];
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/ClinicDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });
const detailSchema = new mongoose.Schema({
  category: String,
  name: String,
  degree: String,
  reg: String
});

const Detail = mongoose.model("Detail", detailSchema);

app.get("/", function(req, res) {
  Detail.find({}, function(err, details) {
    res.render("home", {
      details: details
    });
  });


});
app.get("/contact", function(req, res) {
  res.render("contact");
});
app.post("/contact", function(req, res) {
  const detail = new Detail({
    category: req.body.drCategory,
    name: req.body.drName,
    degree: req.body.drDeg,
    reg: req.body.regNo
  });
  detail.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});
// app.post("/contact", function(req,res){
//   console.log(req.body.drCategory);
//
// })

app.listen(3000, function() {
  console.log("Server is started on port 3000");
});
