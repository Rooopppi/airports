import * as React from 'react'
import './Select.scss'

interface SelectProps {
  label: string
  options: string[]
}

export const Select: React.FC<SelectProps> = ({ label, options }) => {
  return (
    <div className='select-airport'>
      <label>
        {label}
        <select>
          {options.map((option) => (
            <option className='airport-option' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
