import * as React from 'react'
import './Banner.scss'

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
        <span className='destination-title'>{from}</span>
        <div className='layovers'>
          <span className='layover-first'></span>
          <div className='separator' />
          {layovers.map((layover) => (
            <>
              <span className='layover'>{layover}</span>
              <div className='separator' />
            </>
          ))}
          <span className='layover-last'></span>
        </div>
        <span className='destination-title'>{to}</span>
      </div>
      <div className='summary'>
        <div className='change-count'>{changesCount} changes</div>
        <button className='button-go'>Go!</button>
      </div>
    </div>
  )
}
