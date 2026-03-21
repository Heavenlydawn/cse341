const mongodb = require("../database/connect.js");
const objectId = require("mongodb").ObjectId;

const getAllMovies = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const result = await mongodb.getDatabase().db().collection("movies").find();

    const movies = await result.toArray();

    res.status(200).json({
      message: "Movies retrieved successfully.",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching movies",
      error: error.message,
    });
  }
};

const getMoviesById = async (req, res) => {
  // console.log('ID type:', typeof req.params.id)

  //#swagger.tags=['Movies']
  try {
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "invalid id format" });
    }
    const movieId = new objectId(req.params.id);
    // const movieId = req.params.id;

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .findOne({ _id: movieId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "movie not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the movie.",
      error: error.message,
    });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieObject = {
      name: req.body.name,
      description: req.body.description,
      year: req.body.year,
      rating: req.body.rating,
      genre: req.body.genre,
      cast: req.body.cast,
      directors: req.body.directors,
    };

    // console.log(movieObject)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .insertOne(movieObject);
    if (result.acknowledged) {
      res.status(201).json({
        message: "movie created successfully.",
        movieId: result.insertedId,
      });
    } else {
      res.status(500).json({
        message: "An error occurred while creating the movie.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the movie.",
      error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new objectId(req.params.id);
    // const movieId = req.params.id;


    const movieObject = {
      name: req.body.name,
      description: req.body.description,
      year: req.body.year,
      rating: req.body.rating,
      genre: req.body.genre,
      cast: req.body.cast,
      directors: req.body.directors,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .replaceOne({ _id: movieId }, movieObject);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "No movie found with that ID to update.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the movie.",
      error: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new objectId(req.params.id);
    // const movieId = req.params.id;

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .deleteOne({ _id: movieId });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "Movie deleted successfully.",
      });
    } else {
      res.status(404).json({
        message: "No movie found with that ID to delete.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the movie.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMoviesById,
  createMovie,
  updateMovie,
  deleteMovie,
};
