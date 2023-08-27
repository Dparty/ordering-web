import React, { useState } from 'react'
import './index.css'
import Tag from '../../../../components/Tag'

export interface SpecificationsOptionsProps {
  value: string
  label: string
  options: string[]
}

interface IProps {
  options: SpecificationsOptionsProps[]
  selectedOptions: string[]
  onChange: (value: Record<string, string>) => void
}

const SpecificationsOptions: React.FC<IProps> = ({ options, selectedOptions, onChange }) => {
  const [selected, setSelected] = useState({})

  const optionSelected = (optionTitle: string, value: string | number) => {
    setSelected({ ...selected, [optionTitle]: value })
    onChange({ ...selected, [optionTitle]: value })
  }
  return (
    <div className="specifications-options">
      {options.map(option => (
        <div className="specifications-options__item" key={option.value}>
          <div className="specifications-options__title">{option.label}</div>
          <div className="specifications-options__container">
            {option.options.map((i, index) => (
              <Tag
                key={i + index}
                label={i}
                value={i}
                onClick={value => optionSelected(option.value, value)}
                isSelected={selectedOptions.indexOf(i) > -1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SpecificationsOptions
