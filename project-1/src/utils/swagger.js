const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts Api",
        description: "Api serving a list of contacts",
    },
    // host: "cse341-service-05oh.onrender.com",
    host: "localhost:8080",
    schemes: ["http", "https"]
};

const outputFile = './swagger.json';
const endpointsFiles = [
    "../routes/contactRoute.js",
    "../routes/swaggerRoute.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server.js'); // This runs after the swagger file is generated.
});
