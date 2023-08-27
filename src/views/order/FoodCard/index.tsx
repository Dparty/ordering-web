import React from 'react'
import exampleFoodPngUrl from '../../../assets/png/example.png'
import reducePngUrl from '../../../assets/png/reduce.png'
import addPngUrl from '../../../assets/png/add.png'
import './index.css'
import { FoodProps, FoodType } from '../index'

export enum FoodCardActionType {
  SPECIFICATIONS = 'specifications',
  NORMAL = 'normal'
}

interface IProps {
  food: FoodProps
  type?: string
  onAdd: (type: FoodType, food: FoodProps, count: number, specifications?: Record<string, string>, remark?: string) => void
  onReduce: (type: FoodType, food: FoodProps, count: number, specifications?: Record<string, string>, remark?: string) => void
  onSelect: (food: FoodProps) => void
}

const FoodCard: React.FC<IProps> = ({ food, type, onAdd, onReduce, onSelect }) => {
  const foodType = food.specifications ? FoodType.SPECIFICATIONS : FoodType.NORMAL

  const add = () => {
    if (foodType === FoodType.NORMAL || type === 'cart') {
      onAdd(foodType, food, 1, food.specifications, food.remark)
    } else {
      onSelect(food)
    }
  }

  const actionTypeNode = () => {
    if ((food.specifications && food.count > 0) || !food.specifications) {
      return (
        <div className="food-card__action-normal">
          <div className="action-btn" onClick={() => onReduce(foodType, food, 1, food.specifications, food.remark)}>
            <img src={reducePngUrl} alt="减" />
          </div>
          <div className="action-normal-number">{food.count}</div>
          <div className="action-btn" onClick={add}>
            <img src={addPngUrl} alt="加" />
          </div>
        </div>
      )
    }
    return (
      <div className="food-card__action-specifications" onClick={() => onSelect(food)}>
        <button className="action-specifications">选规格</button>
      </div>
    )
  }

  return (
    <div className="food-card">
      <div className="food-card__img">
        <img className="food-img" src={exampleFoodPngUrl} alt="菜品图片" />
      </div>
      <div className="food-card__info">
        <div className="info-header">
          <div className="food-card__info-name text-ellipsis">{food.name}</div>
          <div className="food-card__info-desc text-ellipsis">{food.desc}</div>
        </div>
        <div className="food-card__info-price">
          ¥<span>{food.price}</span>
        </div>
      </div>
      <div className="food-card__action">{actionTypeNode()}</div>
    </div>
  )
}

export default FoodCard
