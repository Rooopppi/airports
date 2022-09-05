import * as React from 'react';
import { Airport } from '../../components/Airport/Airport';
import { SearchBar } from '../../components/SearchBar';
import './Home.scss';
import { useAppDispatch } from '../../hooks';
import { getExtendedAirports } from '../../redux/slices/flightSlice';
import AirportData from '../../interfaces/airport.type';
import ConnectionData from '../../interfaces/connection.type';
import { getAirportsThunked, getConnectionsThunked } from '../../redux/thunks/flightsThunks';
import { Triangle } from 'react-loader-spinner';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [airports, setAirports] = React.useState<AirportData[]>([]);
  const [connections, setConnections] = React.useState<ConnectionData>({});
  const [extendedAirports, setExtendedAirports] = React.useState<AirportData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const airports = await dispatch(getAirportsThunked());
        setAirports(airports);
        const connections = await dispatch(getConnectionsThunked());
        setConnections(connections);
      } catch (error: any) {
        setError(error.message);
        setAirports(JSON.parse(localStorage.getItem('airportsData') || '[]'));
        setConnections(JSON.parse(localStorage.getItem('connectionsData') || '{}'));
      }
    };
    fetchData();
  }, []);

  React.useMemo(() => {
    if (airports.length > 0 && Object.keys(connections).length > 0) {
      setExtendedAirports(getExtendedAirports(airports, connections));
      setLoading(false);
    }
  }, [airports, connections]);

  return (
    <div className='container'>
      {error && <div className='error-message'>{error}</div>}
      <SearchBar />
      {loading ? (
        <Triangle
          height='150'
          width='150'
          color='#e46846'
          ariaLabel='triangle-loading'
          wrapperStyle={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}
          visible={true}
        />
      ) : (
        <div className='airports-container'>
          {extendedAirports.map((airport) => {
            return (
              <div key={airport.code} className='airport-item'>
                <Airport
                  country={airport.country}
                  imageSrc={airport.images.small}
                  name={airport.name}
                  rating={airport.averageRating}
                  directConnections={airport.directionCodes}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
