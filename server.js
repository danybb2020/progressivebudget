const express = require ("express");
const logger = require ("morgan");
const mongoose = require (mongoose);
const compression = require ("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({extended: true}));
app.use(expres.json());

app.use(express.static("public"));

mongoose.connect ("mongod://localhost/budget", {
    useNewUrlParser: true,
    useFindAndModify: false

});

app.use(require ("routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});