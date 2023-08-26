import React from 'react'
import './index.css'
import clockPngUrl from '../../assets/png/clock.png'

const Complete: React.FC = () => {
  const pickupNumber = 'A103'
  return (
    <div className="complete page-container">
      <div className="complete__pickup-wrapper">
        <p className="pickup-label">取餐码</p>
        <p className="pickup-number">{pickupNumber}</p>
      </div>
      <img className="complete__img" src={clockPngUrl} alt="请等待取餐" />
      <div className="complete__text">下单成功～</div>
    </div>
  )
}

export default Complete
