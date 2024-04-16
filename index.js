const express = require("express");
const app = express();
const port = "3000";

//import body-parser via {npm i body-parser}. 
// This package contains middleware that can handle
// the parsing of many different kinds of data,
// making it easier to work with data in routes that
// accept data from the client (POST, PATCH).
const bodyParser = require("body-parser");

//Importing data from databases inside the data directory
const desserts = require("./data/desserts")
const drinks = require("./data/drinks")
const foods = require("./data/foods")


//Use the body-parser middleware first
//This ensures access to the parsed data within the routes
//Access the data via {req.body}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))


// Middleware that will log each time a new request is made (Used during testing)
app.use((req, res, next) => {
    //each time a request is made via the server, a new time will be given
    const time = new Date();
    //we then console.log that date while converting it to locale time
    console.log(
        //.toLocaleTimeString method converts a time to a string and then to a given locations time,
        //or the current location if no locale is specified)

        //req.method will give the type of request made (GET, PATCH, etc)
        //req.url will give the path/route that the server was accessed from for that request.
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    //This "if" statement should only fire off when someone tries to submit data to the api; 
    //examples would be during a PUT,PATCH,POST request (delete as well, but only if the api is setup to give data to 
    // the body when a delete request is made).  
    //This will print the time that the request was made, where it was made to, and the data in the request
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});

//1. Add routes for all of foods database
const foodRoute = require("./routes/foods.js");
app.use('/api/foods', foodRoute)

//2. Add routes for all of drinks database
const drinkRoute = require("./routes/drinks.js")
app.use('/api/drinks', drinkRoute)

//3. Add routes for all of desserts database
const dessertRoute = require("./routes/desserts.js")
app.use('/api/desserts', dessertRoute)

//Homepage GET route
app.get("/",(req, res) => {
    res.send('This is the Hompage')
});

//Adding middleware for any 404 errors
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Item not found" })
})

app.listen(port, (req, res) => {
    console.log(`Currently Listening on ${port}`)
});