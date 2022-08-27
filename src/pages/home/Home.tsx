import * as React from 'react'

import { Airport } from '../../components/Airport/Airport'
import { SearchBar } from '../../components/SearchBar'
import './Home.scss'

export const Home: React.FC = () => {
  return (
    <div className='container'>
      <SearchBar />
      <div className='airports-container'>
        <div className='airport-item'>
          <Airport
            country='Senegal'
            imageSrc='http://centra-flights-api.herokuapp.com/images/small/dkr.jpg'
            name='Dakar-Léopold Sédar Senghor In.'
            rating={4.3}
            directConnections={['BCN', 'MAD', 'ALC', 'CDG', 'CIA']}
          />
        </div>
        <div className='airport-item'>
          <Airport
            country='Greece'
            imageSrc='http://centra-flights-api.herokuapp.com/images/small/ath.jpg'
            name='Athens-Eleftherios Venizelos Inte.'
            rating={4.8}
            directConnections={['BCN', 'MAD', 'ALC', 'CDG', 'CIA']}
          />
        </div>
        <div className='airport-item'>
          <Airport
            country='United States'
            imageSrc='http://centra-flights-api.herokuapp.com/images/small/dca.jpg'
            name='Washington-Ronald Reagan W.'
            rating={4}
            directConnections={['BCN', 'MAD', 'ALC', 'CDG', 'CIA']}
          />
        </div>
      </div>
    </div>
  )
}
