const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks")

//2. Creating GET route for all of drinks database
router
    .route("/")
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
router
  .route("/:id")
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

//export the route
module.exports = router;