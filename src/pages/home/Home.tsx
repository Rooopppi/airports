import * as React from 'react'
import { Airport } from '../../components/Airport/Airport'
import { SearchBar } from '../../components/SearchBar'
import './Home.scss'
import { getAirports, getConnections } from '../../api/flightsApi'
import { useAppDispatch } from '../../hooks'
import { addAirports, addConnections, getExtendedAirports } from '../../slices/flightSlice'
import AirportData from '../../interfaces/airport.type'
import ConnectionData from '../../interfaces/connection.type'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const [airports, setAirports] = React.useState<AirportData[]>([])
  const [connections, setConnections] = React.useState<ConnectionData>({})
  const [extendedAirports, setExtendedAirports] = React.useState<AirportData[]>([])

  React.useEffect(() => {
    getAirports().then((result) => {
      setAirports(result.data)
      dispatch(addAirports(result.data))
    })

    getConnections().then((result) => {
      const parsedConnections = result.data.split('\n').reduce((acc, element) => {
        const dataArray = element.split(':')
        const key = dataArray[0]
        const value = dataArray[1].slice(1).split(', ')
        acc = { ...acc, [key]: value }
        return acc
      }, {})
      setConnections(parsedConnections)
      dispatch(addConnections(parsedConnections))
    })
  }, [])

  React.useMemo(() => {
    if (airports.length > 0 && Object.keys(connections).length > 0) {
      setExtendedAirports(getExtendedAirports(airports, connections))
    }
  }, [airports, connections])

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
          )
        })}
      </div>
    </div>
  )
}
