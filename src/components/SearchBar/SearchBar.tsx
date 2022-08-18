import * as React from 'react'

import { Select } from '../Select'

import './SearchBar.scss'

export const SearchBar: React.FC = () => {
  const options = [
    'Senegal, Dakar-Léopold Sédar Senghor In.',
    'Greece, Athens-Eleftherios Venizelos Inte.',
    'United States, Washington-Ronald Reagan W.',
  ]

  return (
    <div className='searchBar'>
      <Select label='From' options={options} />
      <Select label='To' options={options} />
      <button>Search</button>
    </div>
  )
}
