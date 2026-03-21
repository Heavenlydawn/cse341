const express = require("express");
const router = express.Router();
const cinemasController = require("../controllers/cinemasController.js");
const { ValidationRules, validate } = require("../utils/cinemaValidator.js");
const { ensureAuth } = require("../middleware/auth.js");

// Get all cinemas
// #swagger.tags=['Cinemas']
router.get("/", cinemasController.getAllCinemas);

// Get a single cinema
// #swagger.tags=['Cinemas']
router.get("/:id", cinemasController.getCinemaById); 

// Add a cinema
// #swagger.tags=['Cinemas']
/*
 * #swagger.parameters['body'] = {
 *  in: 'body',
 *  description: 'Add new cinema',
 *  schema: { $ref: '#/definitions/Cinema' }
 * }
 * */
router.post("/", ValidationRules(), validate, cinemasController.createCinema);

// Update a cinema
// #swagger.tags=['Cinemas']
/*
 * #swagger.parameters['body'] = {
 *  in: 'body',
 *  description: 'Update an existing cinema',
 *  schema: { $ref: '#/definitions/Cinema' }
 * }
 * */
router.put("/:id", ValidationRules(), validate, cinemasController.updateCinema);

// Delete a cinema
// #swagger.tags=['Cinemas']
router.delete("/:id", cinemasController.deleteCinema);

module.exports = router;
