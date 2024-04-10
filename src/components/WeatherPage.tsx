import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState } from 'react'; 

interface WeatherPageProps {
  cityName: string; 
}

const fetchWeather = async (city: string) => {
  const apiKey = '3fb02874a95e8eb024ad1ebbbcb700d8';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  return response.json();
};

const WeatherPage: React.FC<WeatherPageProps> = ({ cityName }) => {
  const router = useRouter();
  const { city } = router.query;
  const [isCelsius, setIsCelsius] = useState(true); 

  const { data, isLoading, error } = useQuery(['weather', city], () => fetchWeather(cityName ));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>

  const { main, weather, wind } = data;

 
  const convertToCelsius = (temp: number) => ((temp - 32) * 5) / 9

  return (
    <div className='flex flex-col justify-center items-center py-3'>
      <h1 className='text-4xl font-bold text-green-300'>Weather Page for {city}</h1>
      <div className='py-2'>
      <div>Temperature: {isCelsius ? main.temp : convertToCelsius(main.temp)} {isCelsius ? '°C' : '°F'}</div>
      <div>Weather Description: {weather[0].description}</div>
      <div>Humidity: {main.humidity}%</div>
      <div>Wind Speed: {wind.speed} m/s</div>
      
      <button className='border border-black bg-blue-500 p-2' onClick={() => setIsCelsius(prevState => !prevState)}>
        Click to change °C to °F
      </button>

      </div>
    </div>
  );
};

export default WeatherPage;
