import axios from './inst';
import AirportData from 'src/interfaces/airport.type';

export const getAirports = () => {
  return axios.get<AirportData[]>('/airports');
};

export const getConnections = () => {
  return axios.get<string>('/connections');
};
