import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-duplicate-imports
import type { PayloadAction } from '@reduxjs/toolkit';
import AirportData from '../../interfaces/airport.type';
import ConnectionData from '../../interfaces/connection.type';
import type { RootState } from '../../store';

interface InitialeState {
  airportsData: AirportData[];
  connectionsData: ConnectionData;
  fromPoint: string;
  toPoint: string;
}

const initialState: InitialeState = {
  airportsData: JSON.parse(localStorage.getItem('airportsData') || '[]'),
  connectionsData: JSON.parse(localStorage.getItem('connectionsData') || '{}'),
  fromPoint: JSON.parse(localStorage.getItem('fromPoint') || 'null') || '-',
  toPoint: JSON.parse(localStorage.getItem('toPoint') || 'null') || '-',
};

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    addAirports: (state, action: PayloadAction<AirportData[]>) => {
      state.airportsData = action.payload;
      localStorage.setItem('airportsData', JSON.stringify(action.payload));
    },
    addConnections: (state, action: PayloadAction<ConnectionData>) => {
      state.connectionsData = action.payload;
      localStorage.setItem('connectionsData', JSON.stringify(action.payload));
    },
    addFromPoint: (state, action: PayloadAction<string>) => {
      state.fromPoint = action.payload;
      localStorage.setItem('fromPoint', JSON.stringify(action.payload));
    },
    addToPoint: (state, action: PayloadAction<string>) => {
      state.toPoint = action.payload;
      localStorage.setItem('toPoint', JSON.stringify(action.payload));
    },
  },
});

export const { addAirports, addConnections, addFromPoint, addToPoint } = flightSlice.actions;

export const getAirportsNames = (state: RootState): Array<string> => {
  const airportsNames = state.flights.airportsData.reduce((namesArray: Array<string>, airport) => {
    namesArray = [...namesArray, airport.name];
    return namesArray;
  }, []);
  return airportsNames;
};

export const getExtendedAirports = (
  airports: AirportData[],
  connections: ConnectionData,
): AirportData[] => {
  const extendedAirports = airports.map((airport) => {
    const directConnectionsId = connections[airport.id];
    const directionCodes = directConnectionsId.reduce((arrayOfCodes: Array<string>, id) => {
      const airport = airports.find((el) => {
        return el.id === parseInt(id);
      });
      if (airport) {
        arrayOfCodes.push(airport?.code);
      }
      return arrayOfCodes;
    }, []);
    const extendedAirport = { ...airport, directionCodes };
    return extendedAirport;
  });
  return extendedAirports;
};

export const getAirportByName = (state: RootState, airportName: string): AirportData => {
  const airport = state.flights.airportsData.find((airport) => airport.name === airportName) || {
    name: 'default',
    code: 'default',
    country: 'default',
    connectionsArrayry: 'default',
    id: 111,
    images: {
      thumb: 'default',
      small: 'default',
      full: 'default',
    },
    averageRating: 111,
  };
  return airport;
};

export function getPossiblePaths(state: RootState, start: string, destination: string): string[][] {
  const possiblePaths: string[][] = [];
  // console.log(start, destination);
  const { connectionsData } = state.flights;
  const visited = new Set<string>();

  const pathList: string[] = [];

  // Call recursive utility
  getAllPathsUtil(start, destination, visited, pathList, possiblePaths, connectionsData);
  // console.log('possibleConnections', possiblePaths);
  const possiblePathsCodes = getAirportConnectionsCodesById(state, possiblePaths);
  return possiblePathsCodes;
}

// A recursive function to get
// all paths from 'start' to 'destination'.
// visited keeps track of nodes in current path.
// localPathList<> stores actual nodes in the current path
function getAllPathsUtil(
  start: string,
  destination: string,
  visited: Set<string>,
  localPathList: string[],
  possiblePaths: string[][],
  connectionsData: ConnectionData,
) {
  const connections = connectionsData[start];
  if (start == destination) {
    possiblePaths.push([...localPathList.slice(0, -1)]);
    // if match found then no need to go deeper
    return;
  }

  // Mark the current node
  visited.add(start);

  // Repeate for all the nodes
  // adjacent to current node
  for (const connection of connections) {
    if (!visited.has(connection)) {
      // return if localPathList has more than 4 paths in depth
      if (localPathList.length > 4) {
        return;
      }
      // store current node
      // in path[]
      localPathList.push(connection);

      getAllPathsUtil(
        connection,
        destination,
        visited,
        localPathList,
        possiblePaths,
        connectionsData,
      );

      // remove current node
      // in path[] to go upper
      localPathList.splice(localPathList.indexOf(connection), 1);
    }
  }

  // Delete the current node cos we found connection
  // and we need to go upper
  visited.delete(start);
}

const getAirportConnectionsCodesById = (
  state: RootState,
  possibleConnectionsId: string[][],
): string[][] => {
  const { airportsData } = state.flights;
  const connectionsCodes = possibleConnectionsId.map((idArray: string[]) => {
    return idArray.map((id: string) => {
      const airport = airportsData.find((airport) => {
        return airport.id.toString() === id;
      });
      return airport?.code || 'default';
    });
  });
  // console.log('connectionsCodes', connectionsCodes);
  const sortedConnectionsCodes = connectionsCodes.sort((a, b) => a.length - b.length);
  return sortedConnectionsCodes;
};

export default flightSlice.reducer;
