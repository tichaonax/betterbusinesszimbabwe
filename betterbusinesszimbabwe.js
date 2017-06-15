var express = require('express');

var app = express();

const SERVER_PORT = process.env.PORT || 3000;

app.use((request, response, next) => {

    if (request.headers['x-forwarded-proto'] === 'https') {
        response.redirect('http://' + request.hostname + request.url);
    } else {
        next();
    }
});

app.use(express.static('public'));

app.listen(SERVER_PORT, () => console.log('Express server is up on port ' + SERVER_PORT));
