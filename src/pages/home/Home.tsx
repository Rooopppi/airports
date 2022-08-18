import * as React from 'react'

import { Airport } from '../../components/Airport/Airport'
import { SearchBar } from '../../components/SearchBar'

export const Home: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <div>
        <Airport
          country='Senegal'
          imageSrc='http://centra-flights-api.herokuapp.com/images/small/dkr.jpg'
          name='Dakar-Léopold Sédar Senghor In.'
          rating={4.3}
        />
        <Airport
          country='Greece'
          imageSrc='http://centra-flights-api.herokuapp.com/images/small/ath.jpg'
          name='Athens-Eleftherios Venizelos Inte.'
          rating={4.8}
        />
        <Airport
          country='United States'
          imageSrc='http://centra-flights-api.herokuapp.com/images/small/dca.jpg'
          name='Washington-Ronald Reagan W.'
          rating={4}
        />
      </div>
    </div>
  )
}
