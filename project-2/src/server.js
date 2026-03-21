require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;

const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
let MongoStore = require("connect-mongo");
MongoStore = MongoStore && MongoStore.default ? MongoStore.default : MongoStore;

const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("./database/connect.js");
require("./config/passport.js")(passport);
// const utilities = require("./utils/helper.js");

const loginRoute = require("./routes/loginRoute.js");
const dashboardRoute = require("./routes/dashboardRoute.js");
const moviesRoute = require("./routes/moviesRoute.js");
const cinemasRoute = require("./routes/cinemasRoute.js");

const { ensureGuest, ensureAuth } = require("./middleware/auth.js");

// MIDDLEWARE
app.use(bodyparser.json())
app.use(cors({
        origin: [
            "http://localhost:8080",
            "http://localhost:8080/api-docs",
            "https://cse341-jpc3.onrender.com",
            "https://cse341-jpc3.onrender.com/api-docs"
        ],
    }),
);


// Session
app.use(
    session({
        secret: "Keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); 


// ROUTES

// Home route 
app.get("/", ensureGuest, (req, res) => {
    res.sendFile(path.join(__dirname, "./utils/index.html"));
});

// Login route
app.use("/auth", loginRoute);

// Dashboard route
app.use('/dashboard', dashboardRoute);

// Swagger route
app.use("/", ensureAuth, require("./routes/swaggerRoute.js"));

// Movies route
app.use('/movies', moviesRoute);

// Cinemas route
app.use('/cinemas', cinemasRoute);



// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        message: err.message || "An unexpected error occurred.",
    });
});

// MONGODB CONNECTION
mongodb.initializeDB(async (error, mongodb) => {
    if (error) {
        console.log(error);
    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Mongoose connected");

            app.listen(port, () => {
                console.log("Server listening on http://localhost:" + port);
            });
        } catch (err) {
            console.log("Mongoose connection error:", err);
        }
    }
});
