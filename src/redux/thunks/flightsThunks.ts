import { getAirports, getConnections } from '../../api/flightsApi';
import { addAirports, addConnections } from '../../redux/slices/flightSlice';
import AirportData from '../../interfaces/airport.type';
import ConnectionData from '../../interfaces/connection.type';
import type { AppDispatch } from '../../store';

export const getAirportsThunked = () => {
  return async (dispatch: AppDispatch): Promise<AirportData[]> => {
    const { data } = await getAirports();
    dispatch(addAirports(data));
    return data;
  };
};

export const getConnectionsThunked = () => {
  return async (dispatch: AppDispatch): Promise<ConnectionData> => {
    const { data } = await getConnections();
    const parsedConnections = data.split('\n').reduce((acc, element) => {
      const dataArray = element.split(':');
      const key = dataArray[0];
      const value = dataArray[1].slice(1).split(', ');
      acc = { ...acc, [key]: value };
      return acc;
    }, {});
    dispatch(addConnections(parsedConnections));
    return parsedConnections;
  };
};
