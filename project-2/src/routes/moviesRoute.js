const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController.js");
const { ValidationRules, validate } = require("../utils/movieValidator.js");
const { ensureAuth } = require("../middleware/auth.js");

// Get all movies
// #swagger.tags=['Movies']
// #swagger.path = '/movies'
router.get("/", moviesController.getAllMovies);

// Get a single movie
// #swagger.tags=['Movies']
// #swagger.path = '/movies/{id}'
router.get("/:id", moviesController.getMoviesById);

// Add a movie
// #swagger.tags=['Movies']
// #swagger.path = '/movies'
/*
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Add new movie',
 *   schema: { $ref: '#/definitions/Movie' }
 * }
 */
router.post("/", ValidationRules(), validate, moviesController.createMovie);

// Update a movie
// #swagger.tags=['Movies']
// #swagger.path = '/movies/{id}'
/*
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Update an existing movie',
 *   schema: { $ref: '#/definitions/Movie' }
 * }
 */
router.put("/:id", ValidationRules(), validate, moviesController.updateMovie);

// Delete a movie
// #swagger.tags=['Movies']
// #swagger.path = '/movies/{id}'
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
