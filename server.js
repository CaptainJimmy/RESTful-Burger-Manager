//v1.01
// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var path = require('path');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var logger = require('morgan');
var sequelize = require('sequelize');
var db = require('./models');
var flash = require('connect-flash');

// Create an instance of the express app.
var app = express();
// // Specify the port.
var port = process.env.PORT || '9000';
//  Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views"
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
// middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// static files
app.use(express.static('public'))
    //serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    // init connect-flash for messages NOT IN USE YET

app.use(flash());
// Routes
// main route to render the page
app.get("/", (req, res, next) => {
    //pull the burger lists from mysql, render the outputs into handlebars
    db.burger.findAll({ where: { is_eaten: false } }).then(notEaten => {
        db.burger.findAll({ where: { is_eaten: true } }).then(isEaten => {
            return res.render("burger", {
                title: "Boogers, Not Burgers v2.0",
                notEaten: notEaten,
                isEaten: isEaten
            });
        })


    });
});
//API ROUTES BELOW
//get all
app.get("/api", (req, res, next) => {
    db.burger.findAll({}).then(results => {
        return res.json(results)
    });
});
//another get all
app.get("/api/all", (req, res, next) => {
    db.burger.findAll({}).then(results => {
        return res.json(results)
    });
});
// add / create route, return the new objects
app.post("/api/add", (req, res, next) => {
    db.burger.create(req.body, {}).then(data => {
        return res.json(data)
    }).catch(err => {
        if (err) {
            return res.json(err)
        }
    })
});

// update / put route
app.put("/api/eatburger/:id", (req, res, next) => {
    var eatBurger = req.params.id;
    db.burger.update({ is_eaten: true }, {
        where: { id: eatBurger }
    }).done(results => {
        return res.send(results)
    }).catch(err => {
        if (err) {
            return res.send(err)
        }
    })
});

//fetch all that have been 'eaten' (is_eaten: true || is_eaten: 1)
app.get("/api/eaten", (req, res, next) => {
    db.burger.findAll({ where: { is_eaten: true } }).then(results => {
        return res.json(results)
    }).catch(error => {
        return res.json(error)
    })
});
//fetch all that are  not 'eaten' (is_eaten: false || is_eaten: 0)
app.get("/api/noteaten", (req, res, next) => {
    db.burger.findAll({ where: { is_eaten: false } }).then(results => {
        return res.json(results)
    }).catch(error => {
        return res.render("burger", {
            title: "Boogers, Not Burgers v2.0",
            notEaten: results,
            message: "error"
        })
    });
});
// get a particular id
app.get("/api/:id", (req, res, next) => {
    var burger = req.params.id
    db.burger.findOne({ where: { id: burger } }).then((stuff) => {
        return res.json(stuff)
    }).catch(error => {
        return res.json(error)
    })
});

// delete route
app.delete("/api/delete/:id", (req, res, next) => {
    var deleteBurger = req.params.id
    db.burger.destroy({ where: { id: deleteBurger } }).then((stuff) => {
        return res.json(stuff)
    }).catch(error => {
        return res.json(error)
    })
});

// Sync the database ORM
// Initiate the listener.
db.sequelize.sync({ force: false })
    .then(function() {
        console.log("Starting the server on port " + port)
        app.listen(port);
    });