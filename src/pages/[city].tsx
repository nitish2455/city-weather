import { useRouter } from 'next/router';
import WeatherPage from '../components/WeatherPage';
import Layout from '../components/Layout';

const City = () => {
  const router = useRouter();
  const { city } = router.query;

  const decodedCity = city ? decodeURIComponent(city as string) : '';

  return (
    <Layout title={`Weather for ${city}`}>
      <WeatherPage cityName={decodedCity} />
    </Layout>
  );
};

export default City;
