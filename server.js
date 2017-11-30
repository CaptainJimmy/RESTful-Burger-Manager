// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var path = require('path');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var mysql = require('mysql');
var DBPASSWORD = process.env.DBPASSWORD;
var connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: DBPASSWORD,
	    database: 'burgers_db'
});
// // Create an instance of the express app.
 var app = express();
//
// // Specify the port.
var port= process.env.PORT || '9000';
//
// // Set Handlebars as the default templating engine.
 app.engine("handlebars", exphbs({ 
	 defaultLayout: "layout",
	 layoutsDir: __dirname + "/views"
 }));
app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//
//
//             // Routes
app.get("/", (req, res) => {
			connection.query("SELECT * FROM ready WHERE ?",{is_eaten: 0},(error,notEaten) => {
			if (error) throw error;
			connection.query("SELECT * FROM ready WHERE ?",{is_eaten: 1},(error,isEaten) => {
			if (error) throw error;
			return res.render("burger",{
			title: "Boogers, Not Burgers",	
			notEaten: notEaten,
			isEaten: isEaten});
			})
});                           


    });


	app.post("/", (req,res) => {

		var newBurger=req.body;
	connection.query("INSERT INTO ready SET ?",{burger_name: newBurger.burger_name, user_created: newBurger.user_created,is_eaten: 0 }, (err, result) => {
  		  if (err) throw err
	res.redirect("/");
  });
		

});
        app.post("/eatburger/:id", (req,res) => {
		console.log(req.params.id)
                var eatBurger=req.params.id;
		connection.query("UPDATE ready SET is_eaten = ? WHERE id ="+eatBurger,{is_eaten:1},(error,results)=> {
			console.log(results);
			if (error) throw error;
			return res.redirect("/");

});
});
                                 // Initiate the listener.
                                 app.listen(port);

