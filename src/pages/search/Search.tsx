import * as React from 'react'
import { Banner } from '../../components/Banner/Banner'
import { FlightImage } from '../../components/FlightImage/FlightImage'
import { Link } from 'react-router-dom'
import './Search.scss'

export const Search: React.FC = () => (
  <div className='search-page'>
    <button className='button-back'>
      <Link to='/'>Back</Link>
    </button>
    <div className='background'>
      <img src='http://centra-flights-api.herokuapp.com/images/full/dkr.jpg' />
      <img src='http://centra-flights-api.herokuapp.com/images/full/ath.jpg' />
    </div>
    <div className='content'>
      <div className='from-to-points'>
        <div className='from-point'>
          <div className='from-point-title'>Warsaw</div>
          <div>Warsaw Chopin Airport</div>
        </div>
        <FlightImage />
        <div className='to-point'>
          <div className='to-point-title'>Dubai</div>
          <div>Dubai International Airport</div>
        </div>
      </div>
      <Banner from='WAW' to='DXB' layovers={['AMS', 'CDG']} />
    </div>
  </div>
)
