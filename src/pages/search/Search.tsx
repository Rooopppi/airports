import * as React from 'react'
import { Banner } from '../../components/Banner/Banner'
import { FlightImage } from '../../components/FlightImage/FlightImage'

import './Search.scss'

export const Search: React.FC = () => (
  <div>
    <div className='background'>
      <img src='http://centra-flights-api.herokuapp.com/images/full/dkr.jpg' />
      <img src='http://centra-flights-api.herokuapp.com/images/full/ath.jpg' />
    </div>
    <div className='content'>
      <FlightImage />
      <Banner from='WAW' to='DXB' layovers={['AMS', 'CDG']} />
    </div>
  </div>
)
