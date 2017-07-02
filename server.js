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
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

/*router.route('/services')
    .get(function (req, res) {
        var findAllServices = require('./server/dao/services/findAllServices');
        return new Promise((resolve, reject) => {
            var services= findAllServices();
            return(Promise.resolve(res.json({data: services})));
        }).catch((error)=>{
                return Promise.reject(error)
        });
    });*/

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        //Bear.findById(req.params.bear_id, function(err, bear) {
        //    if (err)
        //        res.send(err);

            res.json({bear:`Masese: ${req.params.bear_id}`});
        //});
    });




app.use('/api', [router,servicesRoutes]);

app.listen(SERVER_PORT, () => console.log('Express server is up on port ' + SERVER_PORT));
