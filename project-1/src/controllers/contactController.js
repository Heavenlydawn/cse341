const mongodb = require("../database/connect.js");
const objectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("contacts")
            .find()
        ;
        
        const contacts = await result.toArray();

        res.status(200).json({
            message: "Contacts retrieved successfully.",
            data: contacts
        });

        // result.toArray().then((contacts) => {
        //     res.setHeader("content-type", "application/json");
        //     res.status(200).json(contacts);
        // });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching contact",
            error: error.message
        })
    }
};

const getContactByID = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
    
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("contacts")
            .findOne({ _id: contactId })
        ;
        
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: "Contact not found."
            });
        };

        // result.toArray().then((contacts) => {
        //     res.setHeader("content-type", "application/json");
        //     res.status(200).json(contacts[0]);
        // });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the contact.",
            error: error.message,
        });
    }
};

const createContact = async (req, res) => {
    try {
        const contactObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };
    
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("contacts")
            .insertOne(contactObject)
        ;
    
        if (result.acknowledged) {
            res.status(201).json({
                message: "contact created successfully.",
                contactId: result.insertedId,
            });
        } else {
            res.status(500).json({
                message: "An error occurred while creating the contact."
            });
        };
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the contact.",
            error: error.message
        });
    };
};


const updateContact = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);

        const contactObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };

        const result = await mongodb
            .getDatabase()
            .db()
            .collection("contacts")
            .replaceOne({_id: contactId}, contactObject)
        ;
        
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({
                message: "No contact found with that ID to update.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the contact.",
            error: error.message,
        });
    }
}

const deleteContact = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection("contacts")
            .deleteOne({ _id: contactId })
        ;
        
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Contact deleted successfully."
            });
        } else {
            res.status(404).json({
                message: "No contact found with that ID to delete.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the contact.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllContacts,
    getContactByID,
    createContact,
    updateContact,
    deleteContact
};
