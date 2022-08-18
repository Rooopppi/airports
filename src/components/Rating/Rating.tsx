import * as React from 'react'

import { Star } from '../../Icons/Star'

import './Rating.scss'

interface RatingProps {
  rating: number
}

export const Rating: React.FC<RatingProps> = ({ rating }) => (
  <div className='rating'>
    <Star />
    {rating}
  </div>
)
