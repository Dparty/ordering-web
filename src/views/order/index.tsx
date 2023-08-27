import './index.css'
import foodIntroductionUrl from '../../assets/png/food-introduction.png'
import SubmitButton from '../../components/SubmitButton'
import Cart from './Cart'
import { useCallback, useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Menu from './Menu'
import SelectSpecifications from './SelectSpecifications'

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
    name: '菜品1',
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
    name: '菜品2',
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
    name: '菜品3',
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
    name: '菜品4',
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
  const [cartVisiable, setCartVisiable] = useState<boolean>(false)
  const [selectSpecificationsVisiable, setSelectSpecificationsVisiable] = useState<boolean>(false)

  const [foods, setFoods] = useState<FoodProps[]>(mockfoods)

  //购物车里的food
  const [selectedFoods, setSelectedFoods] = useState<FoodProps[]>([])
  const [price, setPrice] = useState(0)
  //当前要选规格的food，也就是弹出选规格框的food
  const [selectSpecificationsFood, setSelectSpecificationsFood] = useState<FoodProps>()

  const onSubmit = () => {}

  const showCart = () => {
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
            return { ...sf, count: sf.count + count, specifications, remark }
          } else {
            return sf
          }
        })
      } else {
        _selectedFoods = selectedFoods.map(sf => {
          if (sf.id === food.id && JSON.stringify(sf.specifications) === JSON.stringify(changeSpecifications)) {
            return { ...sf, count: sf.count + count, specifications, remark }
          } else {
            return sf
          }
        })
      }
    } else {
      food.count = count
      changeSpecifications && (food.specifications = changeSpecifications)
      remark && (food.remark = remark)
      _selectedFoods.push(food)
    }
    setSelectedFoods(_selectedFoods)
  }

  const addFood = (type: FoodType, food: FoodProps, count: number, changeSpecifications?: Record<string, string>, remark?: string) => {
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
    changeSelectedFoods(type, hasExist, food, count, changeSpecifications, remark)
  }

  const reduceFood = useCallback(
    (type: FoodType, food: FoodProps, count: number, changeSpecifications?: Record<string, string>, remark?: string) => {
      const _foods = foods.map(food => {
        if (food.id === food.id) {
          let _count = food.count
          if (food.count > count) {
            _count = _count - count
          } else {
            _count = 0
          }
          return { ...food, count: _count }
        } else {
          return food
        }
      })
      setFoods(_foods)

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
      setSelectedFoods(_selectedFoods)
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

  useEffect(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods))
    countPrice()
  }, [selectedFoods])

  useEffect(() => {
    localStorage.setItem('price', JSON.stringify(price))
  }, [price])

  return (
    <div className="order page-container">
      <div className="order_top">
        {/* 最上面的的图片 */}
        <div className="order_top-img">
          <img className="img" src={foodIntroductionUrl} alt="菜品介绍" />
        </div>
        {/* 中间滚动的menu */}
        <div className="order_top-menu">
          <Menu foods={foods} onAdd={addFood} onReduce={reduceFood} onSelect={showSelectSpecifications} />
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
          onShow={showCart}
          onSubmit={onSubmit}
          btnText="选好了"
          price={price}
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
    </div>
  )
}

export default Order
