import * as React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAirportByName, getPossibleConnections } from '../../redux/slices/flightSlice';
import './Search.scss';
import FlightImg from '../../assets/flight.png';

export const Search: React.FC = () => {
  const fromPoint = useAppSelector((state) => state.flights.fromPoint);
  const toPoint = useAppSelector((state) => state.flights.toPoint);
  const fromAirport = useAppSelector((state) => getAirportByName(state, fromPoint));
  const toAirport = useAppSelector((state) => getAirportByName(state, toPoint));

  const connections = useAppSelector((state) =>
    getPossibleConnections(state, fromAirport.id, toAirport.id),
  );

  return (
    <div className='search-page'>
      <button className='button-back'>
        <Link to='/'>Back</Link>
      </button>
      <div className='background'>
        <img src={fromAirport.images.full} />
        <img src={toAirport.images.full} />
      </div>
      <div className='content'>
        <div className='from-to-points'>
          <div className='from-point'>
            <div className='from-point-title'>{fromAirport.country}</div>
            <div>{fromAirport.name}</div>
          </div>
          <img src={FlightImg} className='flight-image' />
          <div className='to-point'>
            <div className='to-point-title'>{toAirport.country}</div>
            <div>{toAirport.name}</div>
          </div>
        </div>
        <Banner from='WAW' to='DXB' layovers={['AMS', 'CDG']} />
      </div>
    </div>
  );
};
