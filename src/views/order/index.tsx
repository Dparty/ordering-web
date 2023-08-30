import './index.css'
import foodIntroductionUrl from '../../assets/png/food-introduction.png'
import SubmitButton from '../../components/SubmitButton'
import Cart from './components/Cart'
import { useCallback, useEffect, useState } from 'react'
import FoodCard from './components/FoodCard'
import Menu from './components/Menu'
import SelectSpecifications from './components/SelectSpecifications'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message'

export enum FoodType {
  NORMAL = 'normal',
  SPECIFICATIONS = 'specifications'
}

export interface FoodProps {
  id: number
  name: string
  desc: string
  price: number
  count: number
  specifications?: any
  remark?: string
}
const specifications = [
  { weight: ['1人份 | ¥36元'] },
  { aaa: ['骨汤', '清汤', '大酱汤'] },
  { bbb: ['不辣', '微辣', '中辣', '香辣', '中辣', '香辣'] }
]
const englishToEn: Record<string, string> = {
  weight: '份量',
  aaa: '汤底',
  bbb: '辣度'
}
const specificationTags = specifications.map(i => ({
  label: englishToEn[Object.keys(i)[0]],
  value: Object.keys(i)[0],
  options: Object.values(i)[0]
}))

const mockfoods: FoodProps[] = [
  {
    id: 1,
    name: '菜品100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 28,
    count: 0,
    specifications: {
      weight: '',
      aaa: '',
      bbb: ''
    },
    remark: ''
  },
  {
    id: 2,
    name: '菜品200+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 27,
    count: 0,
    specifications: {
      weight: '',
      aaa: '',
      bbb: ''
    },
    remark: ''
  },
  {
    id: 3,
    name: '菜品300+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 55,
    count: 0,
    // specifications: {
    //   size: 'large'
    // },
    remark: ''
  },
  {
    id: 4,
    name: '菜品400+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 99,
    count: 0,
    specifications: {
      weight: '',
      aaa: '',
      bbb: ''
    },
    remark: ''
  },
  {
    id: 5,
    name: '菜品5',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 4,
    count: 0,
    // specifications: {
    //   size: 'large'
    // },
    remark: ''
  },
  {
    id: 6,
    name: '菜品6',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 78,
    count: 0,
    // specifications: {
    //   size: 'large'
    // },
    remark: ''
  },
  {
    id: 7,
    name: '菜品7',
    desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
    price: 58,
    count: 0,
    // specifications: {
    //   size: 'large'
    // },
    remark: ''
  }
]

const Order = () => {
  const navigate = useNavigate()

  const sessionStorageSelectedFoods = sessionStorage.getItem('selectedFoods')
  const sessionStoragePrice = sessionStorage.getItem('price')

  const [cartVisiable, setCartVisiable] = useState<boolean>(false)
  //需要选规格的食物。在总的food列表进行add操作时，每次都需要弹出选规格弹框，在购物车进行add操作时不用弹出。
  const [selectSpecificationsVisiable, setSelectSpecificationsVisiable] = useState<boolean>(false)
  //总food列表（从后端请求回来的）
  const [foods, setFoods] = useState<FoodProps[]>(mockfoods)

  //购物车里的food
  const [selectedFoods, setSelectedFoods] = useState<FoodProps[]>(
    sessionStorageSelectedFoods ? JSON.parse(sessionStorageSelectedFoods) : []
  )
  const [price, setPrice] = useState(sessionStoragePrice ? JSON.parse(sessionStoragePrice) : 0)
  //当前要选规格的food，也就是弹出选规格框的food
  const [selectSpecificationsFood, setSelectSpecificationsFood] = useState<FoodProps>()

  const [showMessage, setShowMessage] = useState(false)

  const [cartCount, setCartCount] = useState(0)

  const onSubmit = () => {
    if (selectedFoods.length > 0) {
      navigate('/submit')
    }
  }

  const showCart = () => {
    if (selectedFoods.length === 0) {
      return
    }
    setCartVisiable(!cartVisiable)
  }

  const cancelCart = () => {
    setCartVisiable(false)
  }

  const showSelectSpecifications = (food: FoodProps) => {
    setSelectSpecificationsVisiable(true)
    setSelectSpecificationsFood(food)
  }

  const cancelSelectSpecifications = () => {
    setSelectSpecificationsVisiable(false)
    setSelectSpecificationsFood(undefined)
  }

  const handleShowMessage = () => {
    setShowMessage(true)
  }

  const handleCloseMessage = () => {
    setShowMessage(false)
  }

  const changeFood = (foodId: number, count: number) => {
    const _foods = foods.map(food => {
      if (food.id === foodId) {
        return { ...food, count: food.count + count }
      } else {
        return food
      }
    })
    setFoods(_foods)
  }

  const changeSelectedFoods = (
    type: FoodType,
    hasExist: FoodProps[],
    food: FoodProps,
    count: number,
    changeSpecifications?: Record<string, string>,
    remark?: string
  ) => {
    let _selectedFoods = [...selectedFoods]
    if (hasExist.length > 0) {
      if (type === FoodType.NORMAL) {
        _selectedFoods = selectedFoods.map(sf => {
          if (sf.id === food.id) {
            return { ...sf, count: sf.count + count, remark }
          } else {
            return sf
          }
        })
      } else {
        _selectedFoods = selectedFoods.map(sf => {
          //如果是选中的food 需要规格（specifications）一致才算是同一个食物（总列表没有保存规格）
          if (sf.id === food.id && JSON.stringify(sf.specifications) === JSON.stringify(changeSpecifications)) {
            return { ...sf, count: sf.count + count, specifications: changeSpecifications, remark }
          } else {
            return sf
          }
        })
      }
    } else {
      food.count = count
      if (type === FoodType.SPECIFICATIONS) {
        food.specifications = changeSpecifications
      }
      food.remark = remark
      _selectedFoods.push(food)
    }
    setSelectedFoods(_selectedFoods)
  }

  const addFood = (type: FoodType, food: FoodProps, count: number, changeSpecifications?: Record<string, string>, remark?: string) => {
    //改变总列表的food数量
    changeFood(food.id, count)
    let hasExist = []
    if (type == FoodType.NORMAL) {
      hasExist = selectedFoods.filter(selectedFood => selectedFood.id === food.id)
    } else {
      hasExist = selectedFoods.filter(
        selectedFood => selectedFood.id === food.id && JSON.stringify(selectedFood.specifications) === JSON.stringify(changeSpecifications)
      )
      cancelSelectSpecifications()
    }
    //改变购物车food的数量
    changeSelectedFoods(type, hasExist, food, count, changeSpecifications, remark)
  }

  const reduceFood = useCallback(
    (type: FoodType, food: FoodProps, count: number, changeSpecifications?: Record<string, string>, remark?: string) => {
      if ((type = FoodType.SPECIFICATIONS)) {
        handleShowMessage()
        showCart()
        return
      }
      //总列表food减数量
      const _foods = foods.map(_food => {
        if (_food.id === food.id) {
          let _count = _food.count
          if (food.count === count || food.count === 0) {
            _count = 0
          } else {
            _count = food.count - count
          }
          return { ..._food, count: _count }
        } else {
          return _food
        }
      })
      setFoods([..._foods])

      //购物车food减数量
      const index = selectedFoods.indexOf(food)
      const _selectedFoods = [...selectedFoods]
      if (index > -1) {
        if (selectedFoods[index].count === count) {
          _selectedFoods.splice(index, 1)
        } else if (selectedFoods[index].count < count) {
          _selectedFoods[index].count = 0
        } else {
          _selectedFoods[index].count = selectedFoods[index].count - count
        }
      }
      setSelectedFoods([..._selectedFoods])
    },
    [selectedFoods]
  )

  const countPrice = () => {
    let _price = 0
    if (selectedFoods.length > 0) {
      selectedFoods.forEach(i => {
        _price = _price + i.count * i.price
      })
    }
    setPrice(_price)
  }

  const countCartNumber = () => {
    let _count = 0
    if (selectedFoods.length > 0) {
      selectedFoods.forEach(i => {
        _count = _count + i.count
      })
    }
    setCartCount(_count)
  }

  useEffect(() => {
    //刷新以后从localstorge中拿到信息回显
    if (selectedFoods.length > 0) {
      selectedFoods.forEach(i => changeFood(i.id, i.count))
    }
  }, [])

  //将购物车信息存在localstorge中
  useEffect(() => {
    sessionStorage.setItem('selectedFoods', JSON.stringify(selectedFoods))
    countPrice()
    countCartNumber()
  }, [selectedFoods])

  //将购总价存在localstorge中
  useEffect(() => {
    sessionStorage.setItem('price', JSON.stringify(price))
    sessionStorage.setItem('cartCount', JSON.stringify(cartCount))
  }, [price, cartCount])

  return (
    <div className="order page-container">
      <div className="order_top">
        {/* 最上面的的图片 */}
        <div className="order_top-img">
          <img className="img" src={foodIntroductionUrl} alt="菜品介绍" />
        </div>
        {/* 中间滚动的menu */}
        <div className="order_top-menu">
          <Menu onAdd={addFood} onReduce={reduceFood} onSelect={showSelectSpecifications} />
        </div>
        {/* 购物车 如果购物车是空的不会弹起 */}
        <Cart title="购物车" visiable={cartVisiable} onCancel={cancelCart}>
          {/* 购物车里面的每个菜品 */}
          {selectedFoods.map((selectedFood, index) => (
            <FoodCard
              type="cart"
              key={index}
              food={selectedFood}
              onAdd={addFood}
              onReduce={reduceFood}
              onSelect={showSelectSpecifications}
            />
          ))}
        </Cart>
      </div>
      {/* 最下面的选好了按钮 */}
      <div className="order_bottom">
        <SubmitButton
          disable={selectedFoods.length === 0}
          count={cartCount}
          onShow={showCart}
          onSubmit={onSubmit}
          btnText="选好了"
          price={price}
          showCartImg
        ></SubmitButton>
      </div>
      {/* 选规格modal */}
      <SelectSpecifications
        specificationTags={specificationTags}
        visiable={selectSpecificationsVisiable}
        food={selectSpecificationsFood}
        onCancel={cancelSelectSpecifications}
        onAdd={addFood}
      ></SelectSpecifications>
      {showMessage && <Message message="请在购物车中操作" onClose={handleCloseMessage} />}
    </div>
  )
}

export default Order
