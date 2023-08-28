import './index.css'
import shoppingCartPngUrl from '../../assets/png/shopping-cart.png'
import React from 'react'

interface IProps {
  onShow?: () => void
  onSubmit: () => void
  btnText: string
  price: number
  disable?: boolean
  showCartImg?: boolean
}

const SubmitButton: React.FC<IProps> = ({ onShow, onSubmit, btnText, price, disable, showCartImg }) => {
  return (
    <div className="submit-button">
      <div className="submit-button__left" onClick={onShow}>
        {showCartImg && <img className="submit-button__left-img" src={shoppingCartPngUrl} alt="购物车" />}

        <div className="submit-button__left-price">
          ¥<span>{price}</span>
        </div>
      </div>

      <div
        className={`submit-button__text${disable ? ' submit-button_text-bg-disable' : ' submit-button_text-bg-usable'}`}
        onClick={onSubmit}
      >
        {btnText}
      </div>
    </div>
  )
}

export default SubmitButton
