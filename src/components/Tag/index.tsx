import React from 'react'
import './index.css'

export enum FoodCardActionType {
  SPECIFICATIONS = 'specifications',
  NORMAL = 'normal'
}

interface IProps {
  value: string | number
  label: string
  isSelected: boolean
  onClick: (value: string | number) => void
}

const Tag: React.FC<IProps> = ({ label, value, isSelected, onClick }) => {
  return (
    <div className={`tag${isSelected ? ' tag__selected' : ' tag__normal'}`} onClick={() => onClick(value)}>
      {label}
    </div>
  )
}

export default Tag
