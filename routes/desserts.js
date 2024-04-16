const express = require("express");
const router = express.Router();
const desserts = require("../data/desserts")

//3. Creating GET route for all of desserts database
router
    .route("/")
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
router
  .route("/:id")
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

//export the route
module.exports = router;