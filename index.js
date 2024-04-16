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
const foods = require("./data/foods")
const desserts = require("./data/desserts")
const drinks = require("./data/drinks")


//Use the body-parser middleware first
//This ensures access to the parsed data within the routes
// Access the data via {req.body}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

//1. Creating GET route for all of foods database
app
    .route("/api/foods")
    .get((req, res) => {
    res.json(foods)
    })
    .post((req, res) => {
    // Within the POST request route, we create a new
    // food with the data given by the client.
    if (req.body.name && req.body.type && req.body.manufacturer) {
        //error handling incase someone tries to add the same food that is already in the data
        if (foods.find((u) => u.name == req.body.name)) {
          res.json({ error: "Food Already Here" });
          return;
        }
  
        const food = {
          id: foods[foods.length - 1].id + 1,
          name: req.body.name,
          type: req.body.type,
          manufacturer: req.body.manufacturer,
        };
  
        foods.push(food);
        res.json(foods[foods.length - 1]);
      } else res.json({ error: "Insufficient Data" });
    });
//1a. Creating GET route for for indiviudal foods
app
  .route("/api/foods/:id")
  .get((req, res, next) => {
    const food = foods.find((u) => u.id == req.params.id);
    if (food) res.json(food);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing food in the database.
    const food = foods.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          foods[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (food) res.json(food);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const food = foods.find((u, i) => {
      if (u.id == req.params.id) {
        foods.splice(i, 1);
        return true;
      }
    });

    if (food) res.json(food);
    else next();
  });


//2. Creating GET route for all of drinks database
app
    .route("/api/drinks")
    .get((req, res) => {
    res.json(drinks)
    })
    .post((req, res) => {
    // Within the POST request route, we create a new
    // drink with the data given by the client.
    if (req.body.name && req.body.type && req.body.manufacturer) {
        //error handling incase someone tries to add the same drink that is already in the data
        if (drinks.find((u) => u.name == req.body.name)) {
          res.json({ error: "Drink Already Here" });
          return;
        }
  
        const drink = {
          id: drinks[drinks.length - 1].id + 1,
          name: req.body.name,
          type: req.body.type,
          manufacturer: req.body.manufacturer,
        };
  
        drinks.push(drink);
        res.json(drinks[drinks.length - 1]);
      } else res.json({ error: "Insufficient Data" });
    });
//2a. Creating GET route for for indiviudal drinks
app
  .route("/api/drinks/:id")
  .get((req, res, next) => {
    const drink = drinks.find((u) => u.id == req.params.id);
    if (drink) res.json(drink);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing drink in the database.
    const drink = drinks.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          drinks[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (drink) res.json(drink);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const drink = drinks.find((u, i) => {
      if (u.id == req.params.id) {
        drinks.splice(i, 1);
        return true;
      }
    });

    if (drink) res.json(drink);
    else next();
  });

//3. Creating GET route for all of desserts database
app
    .route("/api/desserts")
    .get((req, res) => {
    res.json(desserts)
    })
    .post((req, res) => {
    // Within the POST request route, we create a new
    // dessert with the data given by the client.
    if (req.body.name && req.body.type && req.body.manufacturer) {
        //error handling incase someone tries to add the same dessert that is already in the data
        if (desserts.find((u) => u.name == req.body.name)) {
          res.json({ error: "Dessert Already Here" });
          return;
        }
  
        const dessert = {
          id: desserts[desserts.length - 1].id + 1,
          name: req.body.name,
          type: req.body.type,
          manufacturer: req.body.manufacturer,
        };
  
        desserts.push(dessert);
        res.json(desserts[desserts.length - 1]);
      } else res.json({ error: "Insufficient Data" });
    });
//3a. Creating GET route for for indiviudal desserts
app
  .route("/api/desserts/:id")
  .get((req, res, next) => {
    const dessert = desserts.find((u) => u.id == req.params.id);
    if (dessert) res.json(dessert);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing dessert in the database.
    const dessert = desserts.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          desserts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (dessert) res.json(dessert);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const dessert = desserts.find((u, i) => {
      if (u.id == req.params.id) {
        desserts.splice(i, 1);
        return true;
      }
    });

    if (dessert) res.json(dessert);
    else next();
  });

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