const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Movies and Cinemas API",
        description: "API serving a list of movies and cinemas",
    },
    host: process.env.NODE_ENV === "production" 
        ? "cse341-jpc3.onrender.com"
        : "localhost:8080",
    schemes: ["http", "https"],
    basePath: "/",
    // tags: [
    //     {
    //         name: "Movies",
    //         description: "Endpoints related to movies",
    //     },
    //     {
    //         name: "Cinemas",
    //         description: "Endpoints related to cinemas",
    //     },
    // ],
    // definitions: {
    //     Movie: {     
    //         name: "Inception",
    //         description: "A mind-bending thriller about dream invasion.",
    //         year: 2010,
    //         rating: 8.8,
    //         genre: "Sci-Fi",
    //         cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //         directors: ["Christopher Nolan"],
    //     },
    //     Cinema: {
    //         name: "Grand Cinema",
    //         location: "123 Main St, Anytown, USA",
    //         address: "123 Main St, Anytown, USA",
    //         // capacity: 200,
    //         // screens: 5,
    //     },
    // },

};

const outputFile = "./swagger.json";
const endpointsFiles = [
    // "../routes/*",
    // "../routes/moviesRoute.js",
    // "../routes/cinemasRoute.js",
    // "../routes/swaggerRoute.js",
    "../server.js",
];

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require("../server.js"); // This runs after the swagger file is generated.
// });

swaggerAutogen(outputFile, endpointsFiles, doc)

