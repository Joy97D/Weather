import './App.css';
import React from 'react'
import { useState,useEffect } from "react";
function App() {
  const [city,setcity]=useState('')
  const [lat,setlat]=useState()
  const [lon,setlon]=useState()
  const [nocity,setnocity]=useState(false)
  const [result,setresult]=useState()
   const  handleclick=async()=>{
      const user= await fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      const geo = await user.json();
      if(geo[0]){
      setlat(geo[0].lat)
      setlon(geo[0].lon)
      setnocity(false)
      }
      else
      {setnocity(true)}
   }
   const  getweather =async()=>{
    const weather= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
    const w=await weather.json()
    setresult(`Temperature at ${city} is ${(w.main.temp-273.15).toFixed(2)}C and Weather Condition is ${w.weather[0].description}`)
   }
   useEffect(()=>{
    if(lat!==undefined && lon!==undefined)
    {
      getweather()
    }
   },[lat,lon])
    return (  
      <div className='Main'>
        <h1>Weather App</h1>
        <div className='App'>
      <input defaultValue={city} onChange={(e)=>setcity(e.target.value)} placeholder='Enter City' size={30} height={100}></input>
      <br/>
      <button onClick={handleclick} disabled={city===(undefined||'')? 1:0}>Get Weather Report</button>
      <div className='Disp'>
        { nocity &&
           <>No City Found</>
        }
        { !nocity &&
        <>{result}</>
        }
        </div>
        </div>
       
      </div>
    );
  }
export default App;
