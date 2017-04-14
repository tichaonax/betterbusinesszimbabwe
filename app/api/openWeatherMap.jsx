var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=2b3cc3672d15daa8ac6fdca062752b3b&units=metric';

//my apiid key = 2b3cc3672d15daa8ac6fdca062752b3b

module.exports = {
    getTemperature: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl).then(function (resp) {
            console.log(resp);
            if(resp.data.cod && resp.data.message){
                throw new Error(resp.data.message);
            }else{
                return resp.data.main.temp;
            }
        }, function (resp){
            throw new Error(resp.response.data.message);
        })
    }
}