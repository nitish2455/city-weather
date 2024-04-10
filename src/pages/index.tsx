import WeatherPage from '@/components/WeatherPage';
import CityTable from '../components/CityTable';
import Layout from '../components/Layout';


const Home = () => (
  <div>
  <Layout title="Cities Table">
  <p className='text-5xl py-2 flex justify-center'> City Names</p>
  <p className='text-2xl py-2 '>Click on the cities to get their weather information </p>

    <CityTable weatherData={WeatherPage} />
  </Layout>
  </div>
);

export default Home;
