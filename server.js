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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// init connect-flash for messages
app.use(express.static('public'))
    //serve the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(flash());

//
//             // Routes
app.get("/", (req, res, next) => {

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

app.get("/api/all", (req, res, next) => {
    db.burger.findAll({}).then(results => {
        return res.json(results)
    });
});

app.post("/api/add", (req, res, next) => {
    db.burger.create(req.body, {}).then(data => {
        db.burger.findAll({ where: { is_eaten: false } }).then(notEaten => {
            db.burger.findAll({ where: { is_eaten: true } }).then(isEaten => {
                return res.render("burger", {
                    title: "Boogers, Not Burgers v2.0",
                    notEaten: notEaten,
                    isEaten: isEaten,
                    message: "Post Successful"
                })
            })
        })
    })
});


app.put("/api/eatburger/:id", (req, res, next) => {
    var eatBurger = req.params.id;
    console.log(eatBurger);
    db.burger.update({ is_eaten: true }, {
        where: { id: eatBurger }
    }).done(results => {
        console.log(results)
        db.burger.findAll({ where: { is_eaten: true } }).then(isEaten => {
            db.burger.findAll({ where: { is_eaten: true } }).then(notEaten => {
                return res.send({ notEaten: notEaten, isEaten: isEaten });

            })

        })

    })
});
app.get("/api/eaten", (req, res, next) => {
    console.log("eaten")
    db.burger.findAll({ where: { is_eaten: true } }).then(results => {
        return res.json(results)
    }).catch(error => {
        return res.render("burger", {
            title: "Boogers, Not Burgers v2.0",
            isEaten: results,
            message: "error"
        })
    })
});
app.get("/api/noteaten", (req, res, next) => {
    console.log("noteaten")

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
app.get("/api/:id", (req, res, next) => {
    var burger = req.params.id
    db.burger.findOne({ where: { id: burger } }).then((stuff) => {
        return res.json(stuff)
    }).catch(error => {
        return res.render("burger", {
            title: "Boogers, Not Burgers v2.0",
            notEaten: results,
            message: error
        })
    })
});

app.delete("/api/delete/:id", (req, res, next) => {
    var deleteBurger = req.params.id
    console.log("delete", deleteBurger)

    db.burger.destroy({ where: { id: deleteBurger } }).then((stuff) => {
        return res.json(stuff)
    }).catch(error => {
        return res.render("burger", {
            title: "Boogers, Not Burgers v2.0",
            notEaten: results,
            message: error
        })
    })
})


// Initiate the listener.
db.sequelize.sync({ force: true })
    .then(function() {
        console.log("Starting the server on port " + port)
        app.listen(port);
    });
