const mongodb = require("../database/connect.js");
const objectId = require("mongodb").ObjectId;

const getAllCinemas = async (req, res) => {
  //#swagger.tags=['Cinemas'] 
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cinemas")
      .find();
    const cinemas = await result.toArray();

    res.status(200).json({
      message: "cinemas retrieved successfully.",
      data: cinemas,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching cinemas",
      error: error.message,
    });
  }
};

const getCinemaById = async (req, res) => {
  //#swagger.tags=['Cinemas']
  try {
      if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'invalid id format' });
    }
    const cinemaId = new objectId(req.params.id);
    // const cinemaId = req.params.id;

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cinemas")
      .findOne({ _id: cinemaId });
      
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "cinema not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the cinema.",
      error: error.message,
    });
  }
};

const createCinema = async (req, res) => {
  //#swagger.tags=['Cinemas']
  try {
    const cinemaObject = {
      name: req.body.name,
      location: req.body.address,
      address: req.body.address,
      // add other fields as needed
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cinemas")
      .insertOne(cinemaObject);
    if (result.acknowledged) {
      res.status(201).json({
        message: "cinema created successfully.",
        cinemaId: result.insertedId,
      });
    } else {
      res.status(500).json({
        message: "An error occurred while creating the cinema.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the cinema.",
      error: error.message,
    });
  }
};

const updateCinema = async (req, res) => {
  //#swagger.tags=['Cinemas']
  try {
    const cinemaId = new objectId(req.params.id);
    // const cinemaId = req.params.id;

    const cinemaObject = {
      name: req.body.name,
      location: req.body.address,
      address: req.body.address,
      // add other fields as needed
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cinemas")
      .replaceOne({ _id: cinemaId }, cinemaObject);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "No cinema found with that ID to update.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the cinema.",
      error: error.message,
    });
  }
};

const deleteCinema = async (req, res) => {
  //#swagger.tags=['Cinemas']
  try {
    const cinemaId = new objectId(req.params.id);
    // const cinemaId = req.params.id;

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("cinemas")
      .deleteOne({ _id: cinemaId });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "Cinema deleted successfully.",
      });
    } else {
      res.status(404).json({
        message: "No cinema found with that ID to delete.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the cinema.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCinemas,
  getCinemaById,
  createCinema,
  updateCinema,
  deleteCinema,
};
