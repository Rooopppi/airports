import * as React from 'react';
import { Airport } from '../../components/Airport/Airport';
import { SearchBar } from '../../components/SearchBar';
import './Home.scss';
import { getAirports, getConnections } from '../../api/flightsApi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAirports, addConnections, getExtendedAirports } from '../../redux/slices/flightSlice';
import AirportData from '../../interfaces/airport.type';
import ConnectionData from '../../interfaces/connection.type';
import { getAirportsThunked, getConnectionsThunked } from '../../redux/thunks/flightsThunks';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [airports, setAirports] = React.useState<AirportData[]>([]);
  const [connections, setConnections] = React.useState<ConnectionData>({});
  const [extendedAirports, setExtendedAirports] = React.useState<AirportData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const airports = await dispatch(getAirportsThunked());
      setAirports(airports);
      const connections = await dispatch(getConnectionsThunked());
      setConnections(connections);
    };

    try {
      fetchData();
    } catch {
      console.log('ss');
    }
  }, []);

  React.useMemo(() => {
    if (airports.length > 0 && Object.keys(connections).length > 0) {
      setExtendedAirports(getExtendedAirports(airports, connections));
    }
  }, [airports, connections]);

  return (
    <div className='container'>
      <SearchBar />
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
    </div>
  );
};
