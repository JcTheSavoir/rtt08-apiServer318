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
    //1a. Creating GET route for for indiviudal foods
app.get("/api/foods/:id",(req, res) => {
    const food = foods.find((u) => u.id == req.params.id);
    if (food) res.json(food)
});

    
//2. Creating GET route for all of drinks database
app.get("/api/drinks",(req, res) => {
    res.json(drinks)
});
    //2a. Creating GET route for for indiviudal drinks
app.get("/api/drinks/:id",(req, res) => {
    const drink = drinks.find((u) => u.id == req.params.id);
    if (drink) res.json(drink)
});

//3. Creating GET route for all of desserts database
app.get("/api/desserts",(req, res) => {
    res.json(desserts)
});
    //3a. Creating GET route for for indiviudal desserts
    app.get("/api/desserts/:id",(req, res) => {
        const dessert = desserts.find((u) => u.id == req.params.id);
        if (dessert) res.json(dessert)
    });

app.listen(port, (req, res) => {
    console.log(`Currently Listening on ${port}`)
});