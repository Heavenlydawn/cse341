const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uri = process.env.MONGODB_URI;

let data;

const initializeDB = (callback) => {
    if (data) {
        console.log("DB already initialized");
        return callback(null, data);
    }

    MongoClient.connect(uri)
        .then((client) => {
            data = client;
            callback(null, data);
        })
        .catch((error) => {
            callback(error);
        });
};

const getDatabase = () => {
    if (!data) {
        throw Error("DB not initialized");
    }
    return data;
};

module.exports = {
    initializeDB,
    getDatabase,
};
