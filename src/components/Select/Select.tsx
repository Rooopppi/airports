import * as React from 'react'

interface SelectProps {
  label: string
  options: string[]
}

export const Select: React.FC<SelectProps> = ({ label, options }) => {
  return (
    <label>
      {label}
      <select>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
