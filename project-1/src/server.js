const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const mongodb = require('./database/connect.js');
const contactRoute = require('./routes/contactRoute.js');
const port = process.env.PORT || 8080;


app
    .use(bodyparser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // change "*" to your specific domain application
        res.setHeader(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        ),
        res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
        next();
    });
;

// ROUTES
app.get('/', (req, res) => { res.send('Homepage') })

// Contacts route
app.use('/contacts', contactRoute);

// Swagger route
app.use('/', require('./routes/swaggerRoute.js'))


mongodb.initializeDB((error, mongodb) => {
    if (error) {
        console.log(error);

    } else {
        app.listen(port, () => {
            console.log("Server listening on localhost:" + port);
        })
    }
});



