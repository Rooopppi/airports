import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import type { PayloadAction } from '@reduxjs/toolkit'
import AirportData from '../interfaces/airport.type'
import ConnectionData from '../interfaces/connection.type'
import type { RootState } from '../store'

interface InitialeState {
  airportsData: AirportData[]
  connectionsData: ConnectionData
  fromPoint: string
  toPoint: string
}

const initialState: InitialeState = {
  airportsData: [],
  connectionsData: {},
  fromPoint: '-',
  toPoint: '-',
}

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    addAirports: (state, action: PayloadAction<AirportData[]>) => {
      state.airportsData = action.payload
    },
    addConnections: (state, action: PayloadAction<ConnectionData>) => {
      state.connectionsData = action.payload
    },
    addFromPoint: (state, action: PayloadAction<string>) => {
      state.fromPoint = action.payload
    },
    addToPoint: (state, action: PayloadAction<string>) => {
      state.toPoint = action.payload
    },
  },
})

export const { addAirports, addConnections, addFromPoint, addToPoint } = flightSlice.actions

export const getAirportsNames = (state: RootState): Array<string> => {
  const airportsNames = state.flights.airportsData.reduce((namesArray: Array<string>, airport) => {
    namesArray = [...namesArray, airport.name]
    return namesArray
  }, [])
  return airportsNames
}

export const getExtendedAirports = (
  airports: AirportData[],
  connections: ConnectionData,
): AirportData[] => {
  const extendedAirports = airports.map((airport) => {
    const directConnectionsId = connections[airport.id]
    const directionCodes = directConnectionsId.reduce((arrayOfCodes: Array<string>, id) => {
      const airport = airports.find((el) => {
        return el.id === parseInt(id)
      })
      if (airport) {
        arrayOfCodes.push(airport?.code)
      }
      return arrayOfCodes
    }, [])
    const extendedAirport = { ...airport, directionCodes }
    return extendedAirport
  })
  return extendedAirports
}

export default flightSlice.reducer
