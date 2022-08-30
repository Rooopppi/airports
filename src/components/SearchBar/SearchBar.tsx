import * as React from 'react'
import { Select } from '../Select'
import { getAirportsNames, addToPoint, addFromPoint } from '../../slices/flightSlice'
import { useAppSelector } from '../../hooks'

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
      <button className='button-search'></button>
    </div>
  )
}
