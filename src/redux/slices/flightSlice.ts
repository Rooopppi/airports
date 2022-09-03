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

// export const getPossibleConnections = (
//   state: RootState,
//   fromAirportId: number,
//   toAirportId: number,
// ): void => {
//   const { connectionsData } = state.flights;
//   const queue = [fromAirportId.toString()];
//   const visited = new Set();
//   const possibleConnections = [];

//   while (queue.length > 0) {
//     const airportId = queue.shift();

//     if (!airportId) {
//       return;
//     }

//     const destinations = connectionsData[parseInt(airportId)];
//     destinations.forEach((destination: string) => {
//       if (destination === toAirportId.toString()) {
//         console.log(fromAirportId, toAirportId, 'first');
//       }

//       if (!visited.has(destination)) {
//         visited.add(destination);
//         queue.push(destination);
//         console.log(destination);
//       }
//     });
//   }
// };

// const bfs = (start) => {
//   const visited = new Set();

//   const queue = [start];

//   while (queue.length > 0) {
//     const airport = queue.shift(); // mutates the queue

//     const destinations = adjacencyList.get(airport);

//     for (const destination of destinations) {
//       if (destination === 'BKK') {
//         console.log(`BFS found Bangkok!`);
//       }

//       if (!visited.has(destination)) {
//         visited.add(destination);
//         queue.push(destination);
//       }
//     }
//   }
// };

// const searchConnections = (
//   fromAirportId: number,
//   visited = new Set(),
//   connections: ConnectionData,
//   toAirportId: number,
// ): string[] | undefined => {
//   visited.add(fromAirportId);

//   const destinations = connections[fromAirportId];
//   const connectionsArray = [];
//   for (const destination of destinations) {
//     connectionsArray.push(destination);
//     if (destination === toAirportId.toString()) {
//       console.log(connectionsArray);

//       if (connectionsArray.length < 5) {
//         return connectionsArray;
//       }
//       return;
//     }

//     if (!visited.has(destination)) {
//       console.log(destination);
//       visited.add(destination);
//       searchConnections(parseInt(destination), visited, connections, toAirportId);
//     }
//   }
// };

export const getPossibleConnections = (
  state: RootState,
  fromAirportId: number,
  toAirportId: number,
): void => {
  const possibleConnections: string[][] = [];
  console.log(fromAirportId, toAirportId);
  const { connectionsData } = state.flights;

  const dfs = (fromAirportId: number, visited = new Set()) => {
    visited.add(fromAirportId);
    const destinations = connectionsData[fromAirportId];
    for (const destination of destinations) {
      if (destination === toAirportId.toString()) {
        console.log('found');
        return;
      }

      if (!visited.has(destination)) {
        console.log(destination);
        visited.add(destination);
        dfs(parseInt(destination), visited);
      }
    }
  };

  dfs(fromAirportId);
  console.log(possibleConnections);
};

export default flightSlice.reducer;
