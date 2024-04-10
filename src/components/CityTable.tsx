import { useQuery } from 'react-query';
import { useState } from 'react';

interface City {
  geoname_id: number;
  name: string;
  cou_name_en: string;
  
}

interface CityTableProps {
  weatherData: any; 
}

const fetchCities = async () => {
  const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100');
  const data = await response.json();
  return data.results;
};

const CityTable: React.FC<CityTableProps> = ({ weatherData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isLoading, error } = useQuery('cities', fetchCities);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const filteredCities: City[] = data.filter((city: City) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div >
      <div className='flex justify-center items-baseline gap-2'>
      <p  className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-blue-300 disabled:bg-gray-400">Search for City</p>
       <input
        type="text"
        placeholder="Search city..."
        className="bg-gray-50 border border-gray-300 text-sm w- indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      
      
      <div className="relative overflow-x-auto py-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-xl">
                    City Name
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Country
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Timezone
                </th>
            </tr>
        </thead>
        <tbody>
            {filteredCities.map((city: any) => (
                <tr key={city.geoname_id} className="bg-white border-b hover:text-blue-400 dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <a href={`/${encodeURIComponent(city.name)}`} target="_blank">{city.name}</a>
                    </th>
                    <td className="px-6 py-4 hover:text-blue-400">
                        {city.cou_name_en}
                    </td>
                    <td className="px-6 py-4 hover:text-blue-400">
                        {city.timezone}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

      {/* <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city: any) => (
            <tr key={city.geoname_id}>
              <td>
              <a href={`/${encodeURIComponent(city.name)}`} target="_blank">{city.name}</a>
              </td>
              <td>{city.cou_name_en}</td>
              
            </tr>
          ))}
        </tbody> */}
      {/* </table> */}
    </div>
  );
};

export default CityTable;
