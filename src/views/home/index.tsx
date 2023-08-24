import './index.css'
import shopPngUrl from '../../assets/png/shop.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="home__order-btn-wpapper">
        <button className="home__order-btn" onClick={() => navigate('/order')}>
          <img className="btn-img" src={shopPngUrl} alt="shop" />
          <span className="btn-text">堂食点餐</span>
        </button>
      </div>
    </div>
  )
}

export default Home
