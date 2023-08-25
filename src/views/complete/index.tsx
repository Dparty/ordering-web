import React from 'react'
import './index.css'
import clockPngUrl from '../../assets/png/clock.png'

interface IProps {
  pickupNumber: number
}

const Complete: React.FC<IProps> = ({ pickupNumber }) => {
  return (
    <div className="complete">
      <div className="complete__pickup-wrapper">
        <p className="pickup-label">取餐码</p>
        <p className="pickup-number">{pickupNumber ?? 'A103'}</p>
      </div>
      <img className="complete__img" src={clockPngUrl} alt="请等待取餐" />
      <div className="complete__text">下单成功～</div>
    </div>
  )
}

export default Complete
