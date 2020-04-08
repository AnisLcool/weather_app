import React, { useState } from 'react';

// import './App.css';
import './index.css';
const api = {
    key: "71a57ec7b60326f52b7127fd16f19870",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const search = event => {
        if (event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery('');
                    console.log("result : " , result)
                })


        }
    }
    const dateBuilder = (d) => {   
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        
        return `${day} ${date} ${month} ${year}`
    }

    
    // code below means : if we return the weather object then => see if the temp > 16 (warm weather )
    // put the class "warm"(it contains the warm image background) other wise if it's less than 16 
    // set the background to cold image 
    let time = `${new Date().getHours() + (weather.timezone / 3600 - 1)}:${new Date().getMinutes()}:
                    ${new Date().getSeconds()}`
    return (
        <div style={
               (typeof weather.main != "undefined") ?
                {
                   backgroundImage : `url(${require(`./assets/${weather.weather[0].main}.jpg`)})`,
                      backgroundSize :"100% 100%",
  
                  transition: "0.4 ease" }: {
                     backgroundImage: `url(${require("./assets/sunny2.jpeg")})`,
                      backgroundSize :"100% 100%",
  
                  transition: "0.4 ease"
        } 

    
        }> 
        
      <main>
        <div className="search-box">

           <input type="text" className="search-bar" placeholder="search location ..." onChange={
             e => setQuery(e.target.value)
           } value={query} onKeyPress={search}/>


        </div>
        {(typeof (weather.main) != "undefined") ? (
  <div>
  
        <div className="location-box">

            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}<br/>
            {time}</div>
          
        </div>

        <div className="weather-box">
              <div className="temp">
              {Math.round(weather.main.temp)}°c
              </div>

              <div className="weather">
                  {weather.weather[0].main}
              </div>
        </div>
  </div>
        ) : ('')}
      </main>
    </div>
    );
}

export default App;