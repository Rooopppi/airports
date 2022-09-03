import * as React from 'react'
import './Airport.scss'
import { Rating } from '../Rating'
import { useAppDispatch } from '../../hooks'
import { addToPoint, addFromPoint } from '../../redux/slices/flightSlice'

interface AirportProps {
  imageSrc: string
  name: string
  country: string
  rating: number
  directConnections?: Array<string>
}

export const Airport: React.FC<AirportProps> = ({
  imageSrc,
  name,
  country,
  rating,
  directConnections,
}) => {
  const [directConnectionsReduced, setDirectConnectionsReduced] = React.useState<Array<string>>([])
  const [directConnectionsExtra, setDirectConnectionsExtra] = React.useState(0)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!directConnections) {
      return
    }
    if (directConnections.length > 11) {
      setDirectConnectionsReduced(directConnections.slice(0, 11))
      setDirectConnectionsExtra(directConnections.length - 11)
    } else {
      setDirectConnectionsReduced(directConnections)
    }
  }, [directConnections])

  return (
    <div className='airport'>
      <img className='image' src={imageSrc} />
      <div className='overlay' />
      <div className='content'>
        <div className='basicInfo'>
          <div className='info-wrapper'>
            <div>
              <h2>{country}</h2>
            </div>
            <Rating rating={rating} />
          </div>
          <div className='airport-name'>{name}</div>
        </div>
        <p>Direct connections</p>
        <div className='direct-connections'>
          {directConnectionsReduced.map((connection) => {
            return (
              <div className='direct-connection' key={connection}>
                {connection}
              </div>
            )
          })}
          {directConnectionsExtra ? (
            <span className='extra-connections'>+ {directConnectionsExtra} more</span>
          ) : null}
        </div>
        <button onClick={() => dispatch(addFromPoint(name))} className='button-start-from'>
          Start from
        </button>
        <button onClick={() => dispatch(addToPoint(name))}>Go to</button>
      </div>
    </div>
  )
}
