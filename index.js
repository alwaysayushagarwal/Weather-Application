let weather = {
    apiKey: "48de8addeaee9c52fe507146a2041e6d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        getByClass("city").item(0).innerText = "Weather in " + name ;
        getByClass("icon").item(0).src = "http://openweathermap.org/img/wn/"+ icon + ".png"; 
        getByClass("temperature").item(0).innerText = temp + "°C";
        getByClass("description").item(0).innerText = description;
        getByClass("humidity").item(0).innerText = "Humidity: " + humidity + "%";
        getByClass("wind-speed").item(0).innerText = "Wind Speed: " + speed + "km/h";
        getByClass("weather").item(0).classList.remove("loading");
        document.body.style.backgroundImage = "url(https://source.unsplash.com/random/1600x900/?" + name + ")";        
    }, 

    search: function () {
        this.fetchWeather(document.querySelector(".input").value);
    }
};


document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

function getByClass(e){
   return document.getElementsByClassName(e);
}

document.querySelector(".input").addEventListener("keydown", function(event){
if(event.key == "Enter"){  
    weather.search();
    getByClass("input").item(0).value = "";
}
});

weather.fetchWeather("Delhi");