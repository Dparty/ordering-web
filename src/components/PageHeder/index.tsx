import './index.css'
import goBack from '../../assets/png/goBack.png'
import { useNavigate } from 'react-router-dom'

const PageHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="page-header">
      <div className="page-header__left" onClick={() => navigate(-1)}>
        <img className="page-header__left-back" src={goBack} alt="返回" />
      </div>
      <div className="page-header__center">日式料理</div>
      <div className="page-header__right"></div>
    </div>
  )
}

export default PageHeader
