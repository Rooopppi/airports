import * as React from 'react'
import { Home } from '../pages/home'
import { Search } from '../pages/search'
import { Routes, Route, Link } from 'react-router-dom'

import './App.scss'

export const App: React.FC = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='search' element={<Search />} />
      </Routes>
    </div>
  )
}
