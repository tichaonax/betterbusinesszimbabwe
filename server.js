var Promise = require("bluebird");
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var servicesRoutes = require('./server/api/services/servicesRoutes');
process.env.BBZ_DATABASE_PATH = path.join(__dirname, '/server/database/betterbusinesszimbabwe.sqlite3');
console.log("process.env.BBZ_DATABASE_PATH",process.env.BBZ_DATABASE_PATH);
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SERVER_PORT = process.env.PORT || 3000;

app.use((request, response, next) => {

    if (request.headers['x-forwarded-proto'] === 'https') {
        response.redirect('http://' + request.hostname + request.url);
    } else {
        next();
    }
});

app.use(express.static('public'));

// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

// ROUTES FOR OUR API
router.route('/')
    .get(function(req, res) {
        res.json({api:`Welcome to Better Business Zimbabwe Apis`});
        //});
    });

app.use('/api', [router,servicesRoutes]);

app.listen(SERVER_PORT, () => console.log('Express server is up on port ' + SERVER_PORT));
