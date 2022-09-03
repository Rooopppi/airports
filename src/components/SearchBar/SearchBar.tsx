import * as React from 'react'
import { Select } from '../Select'
import { getAirportsNames, addToPoint, addFromPoint } from '../../redux/slices/flightSlice'
import { useAppSelector } from '../../hooks'
import { Link } from 'react-router-dom'

import './SearchBar.scss'

export const SearchBar: React.FC = () => {
  const airportsNames = useAppSelector((state) => getAirportsNames(state))
  const fromPoint = useAppSelector((state) => state.flights.fromPoint)
  const toPoint = useAppSelector((state) => state.flights.toPoint)

  return (
    <div className='searchBar'>
      <Select
        selectedOption={fromPoint}
        addSelectedPoint={addFromPoint}
        dropdownName='from-dropdown'
        label='From'
        options={airportsNames}
      />
      <Select
        selectedOption={toPoint}
        addSelectedPoint={addToPoint}
        dropdownName='to-dropdown'
        label='To'
        options={airportsNames}
      />
      <Link to='/search'>
        <button className='button-search'></button>
      </Link>
    </div>
  )
}
