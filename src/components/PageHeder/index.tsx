import './index.css'
import goBack from '../../assets/png/goBack.png'

const PageHeader = () => {
  return (
    <div className="page-header">
      <div className="page-header__left">
        <img className="page-header__left-back" src={goBack} alt="返回" />
      </div>
      <div className="page-header__center">日式料理</div>
      <div className="page-header__right"></div>
    </div>
  )
}

export default PageHeader
