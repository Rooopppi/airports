import * as React from 'react'

import './Search.scss'

interface BannerProps {
  from: string
  to: string
  layovers: string[]
}

export const Banner: React.FC<BannerProps> = ({ from, to, layovers }) => {
  const changesCount = layovers.length

  return (
    <div className='banner'>
      <div className='travel'>
        <span>{from}</span>
        <div className='layovers'>
          <div className='separator' />
          {layovers.map((layover) => (
            <>
              <span className='layover'>{layover}</span>
              <div className='separator' />
            </>
          ))}
        </div>
        <span>{to}</span>
      </div>
      <div className='summary'>
        {changesCount} change
        <button>Go!</button>
      </div>
    </div>
  )
}
