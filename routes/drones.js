const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((drones) => {
      //console.log("Rendered Drones:", { drones });
      res.render(`drones/list`, { drones });
    })
    .catch((err) => {
      `Error Rendering Drones`;
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render(`drones/create-form.hbs`);
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create(req.body)
    .then((newDrone) => {
      res.redirect("/drones");
    })
    .catch((err) => {
      res.redirect("drones/create");
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id).then((updateDrone) => {
    res.render("drones/update-form.hbs", updateDrone);
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(
    req.params.id,
    { name, propellers, maxSpeed },
    { new: true }
  ).then(() => {
    res.redirect("/drones");
  });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id).then(() => {
    res.redirect(`/drones`);
  });
});

module.exports = router;
