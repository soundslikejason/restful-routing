var bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1447684808650-354ae64db5b8?dpr=1&auto=compress,format&fit=crop&w=376&h=252&q=80&cs=tinysrgb&crop=",
//     body: "Hello, this is a blog post!"
// });

//RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running.");
});


