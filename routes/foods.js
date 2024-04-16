const express = require("express");
const router = express.Router();
const foods = require("../data/foods")

//1. Creating GET route for all of foods database
router
    .route("/")
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
router
  .route("/:id")
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


//export the route
module.exports = router;