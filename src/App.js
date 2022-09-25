import axios from "axios";
import React, { useState,useEffect } from "react";
import'./App.css';
import ShowTemp from "./ShowTemp";

const URL = `http://api.openweathermap.org/data/2.5`;
const API_KEY = `f3f190cb066c589665229f1da90837b5`;


function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    description: "",
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });

  const handleClick = () => {
    axios
      .get(`${URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
        });
      });
  };

  return (
    <>
      <div className="container text-center my-2">
        <h1>Weather App Using React JS</h1>
        <input
          type="text"
          className="from-control searchbar"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          className="btn btn-primary mx-2"
          type="submit"
          onClick={handleClick}
        >
          Search
        </button>
      </div>

      <ShowTemp text={data}></ShowTemp>
    </>
  );
}

export default App;
