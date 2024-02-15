import React, { useState } from 'react'
import axios from 'axios'

const Input = () => {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})
    
    const handleChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Effectuer une requête au backend
            const response = await axios.get(`http://localhost:3000/weather/${city}`);
            // Mettre à jour l'état avec la réponse JSON
            setWeather(response.data);

          } catch (error) {
            console.error('Erreur lors de la requête :', error);
            setWeather({});
          }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Ville:
                    <input
                    type="text"
                    value={city}
                    onChange={handleChange}
                    />
                </label>
                <button type="submit">Météo</button>
            </form>
            <div>
                { Object.keys(weather).length === 0 ? (
                    <div>
                        <p>Pas de données</p>
                    </div>
                ) : (
                    
                    <div>
                        <h3>{weather.city}, {weather.country}</h3>
                        <p>{weather.temperature} °C</p>
                    </div>
                )
                }
            </div>
        </>
      );
}

export default Input