var express = require('express');
var app = express();


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));
// all pages
app.get('/', function(req, res) {
res.render("index.ejs");
});
app.get('/signup.ejs', function(req, res) {
res.render("signup.ejs");
});
app.get('/addparcel.ejs', function(req, res) {
res.render("addparcel.ejs");
});
app.get('/addparcel.ejs', function(req, res) {
res.render("addparcel.ejs");
});
app.get('/admindashboard.ejs', function(req, res) {
res.render("admindashboard.ejs");
});
app.get('/admindparceldetails.ejs', function(req, res) {
res.render("admindparceldetails.ejs");
});
app.get('/allparcels.ejs', function(req, res) {
res.render("allparcels.ejs");
});

app.get('/dashboard.ejs', function(req, res) {
res.render("dashboard.ejs");
});

app.get('/intransit.ejs',function(req,res){
	res.render('intransit.ejs');
});

app.get('/parceldetails.ejs',function(req,res){
	res.render('parceldetails.ejs');
});

app.get('/profile.ejs',function(req,res){
	res.render('profile.ejs');
});




var port    =   process.env.PORT || 8080;
app.listen(port, function() {
})