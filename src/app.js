import $ from 'jquery';
import Rx from 'rxjs/Rx';

const rxFetch = require("rxjs-fetch");
const searchWeather = document.getElementById("searchWeather");
const searchStream = Rx.Observable.fromEvent(searchWeather, "submit")
.map(e => {
    e.preventDefault();
    return {
        city: e.currentTarget[0].value.replace(' ', '_'),
        state: e.currentTarget[1].value
    };
})
.switchMap( v => getWeather(v.city, v.state))
.map(v => v.current_observation);

searchStream.subscribe(res => {
    console.log(res);
})



function getWeather(city, state) {
     return rxFetch(`http://api.wunderground.com/api/b6381e12550334c7/conditions/q/${state}/${city}.json`).json();
}