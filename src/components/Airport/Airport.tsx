import * as React from 'react'

import './Airport.scss'
import { Rating } from '../Rating'

interface AirportProps {
  imageSrc: string
  name: string
  country: string
  rating: number
}

export const Airport: React.FC<AirportProps> = ({ imageSrc, name, country, rating }) => {
  return (
    <div className='airport'>
      <img className='image' src={imageSrc} />
      <div className='overlay' />
      <div className='content'>
        <div className='basicInfo'>
          <span>
            <h2>{country}</h2>
            <p>{name}</p>
          </span>
          <Rating rating={rating} />
        </div>
        <p>Direct connections</p>
        <button>Start from</button>
        <button>Go to</button>
      </div>
    </div>
  )
}
