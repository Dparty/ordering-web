import './index.css'
import cancelPngUrl from '../../../assets/png/cancel.png'
import { ReactNode } from 'react'

interface IProps {
  title: string
  visiable: boolean
  onCancel: () => void
  children: ReactNode
}

const Cart: React.FC<IProps> = ({ title, visiable, onCancel, children }) => {
  if (!visiable) return null

  return (
    <div className="cart">
      <div className="cart__mask"></div>
      <div className="cart__content">
        <div className="cart__content-header">
          <div className="cart__content-header-title">{title}</div>
          <div className="cart__content-header-cancel" onClick={onCancel}>
            <img className="cancel-img" src={cancelPngUrl} alt="关闭" />
          </div>
        </div>
        <div className="cart__content-body">{children}</div>
      </div>
    </div>
  )
}

export default Cart
