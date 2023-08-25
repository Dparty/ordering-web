import './index.css'
import shoppingCartPngUrl from '../../assets/png/shopping-cart.png'
import React from 'react'

interface IProps {
  onSubmit: () => void
  btnText: string
  money: number
  disable?: boolean
}

const SubmitButton: React.FC<IProps> = ({ onSubmit, btnText, money, disable }) => {
  return (
    <div className="submit-button" onClick={onSubmit}>
      <img className="submit-button__img" src={shoppingCartPngUrl} alt="购物车" />
      <div className="submit-button__money">¥{money}</div>
      <div
        className={`submit-button__text${disable ? ' submit-button_text-bg-disable' : ' submit-button_text-bg-usable'}`}
        onClick={() => disable && onSubmit}
      >
        {btnText}
      </div>
    </div>
  )
}

export default SubmitButton
