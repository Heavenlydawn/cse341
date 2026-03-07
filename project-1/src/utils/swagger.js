const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts API",
        description: "API serving a list of contacts",
    },
    host: process.env.NODE_ENV === "production" 
    ? "cse-341-project1-7kuv.onrender.com"
    : "localhost:8080",
    schemes: ["http", "https"],
    tags: [
    {
        name: "Contacts",
        description: "Endpoints related to contacts",
    },
]
};

const outputFile = './swagger.json';
const endpointsFiles = [
    "../routes/contactRoute.js",
    "../routes/swaggerRoute.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server.js'); // This runs after the swagger file is generated.
});
