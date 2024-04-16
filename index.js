const express = require("express");
const app = express();
const port   = "3000";
const bodyParser = require("body-parser");

//Importing data from databases inside the data directory
const foods = require("./data/foods")
const desserts = require("./data/desserts")
const drinks = require("./data/drinks")

//Homepage GET route
app.get("/",(req, res) => {
    res.send('This is the Hompage')
});

//1. Creating GET route for all of foods database
app.get("/api/foods",(req, res) => {
    res.json(foods)
});
    
//2. Creating GET route for all of drinks database
app.get("/api/drinks",(req, res) => {
    res.json(drinks)
});

//3. Creating GET route for all of desserts database
app.get("/api/desserts",(req, res) => {
    res.json(desserts)
});

app.listen(port, (req, res) => {
    console.log(`Currently Listening on ${port}`)
});