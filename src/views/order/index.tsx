import './index.css'
import dishIntroductionUrl from '../../assets/png/dish-introduction.png'
import SubmitButton from '../../components/SubmitButton'

const Order = () => {
  const onSubmit = () => {}
  return (
    <div className="order page-container">
      <div className="order_top">
        <img className="img" src={dishIntroductionUrl} alt="菜品介绍" />
      </div>
      <div className="order_bottom">
        <div className="order_bottom-menu">111</div>
        <div className="order_bottom-btn">
          <SubmitButton onSubmit={onSubmit} btnText="选好了" money={99}></SubmitButton>
        </div>
      </div>
    </div>
  )
}

export default Order
