import * as React from 'react'
import './Select.scss'
import { useAppDispatch } from '../../hooks'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface SelectProps {
  label: string
  options: string[]
  dropdownName: string
  selectedOption: string
  addSelectedPoint: ActionCreatorWithPayload<string, string>
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  dropdownName,
  selectedOption,
  addSelectedPoint,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false)

  const dispatch = useAppDispatch()

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const setOption = (option: string) => {
    dispatch(addSelectedPoint(option))
    setIsOptionsOpen(false)
  }

  return (
    <div className='select-airport'>
      <label>{label}</label>
      <button className='selected-option' onClick={toggleOptions}>
        {selectedOption}
      </button>
      {isOptionsOpen && (
        <div className={dropdownName}>
          {options.map((option) => (
            <button
              className='option'
              onClick={(e) => {
                e.preventDefault()
                setOption(option)
              }}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
