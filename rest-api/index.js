const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/users");
const tokensRoute = require("./routes/tokens");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");


dotenv.config();

// Initialize middleware
//API security 
app.use(helmet());

//handle CORS error
app.use(cors());

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//MangoDB Connection setup
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {console.log("Connected to MongoDB")})
    .catch(err => { console.log(err) });

//Logger 
app.use(morgan("common"));

//set body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routers use
app.use("/api/users", userRoute);
app.use("/api/tokens", tokensRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


//Error handler
const handleError = require("./utils/errorHandler");

app.use((req, res, next) => {
    const error = new Error("Resources not found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    handleError(error, res);
});


const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`)
});