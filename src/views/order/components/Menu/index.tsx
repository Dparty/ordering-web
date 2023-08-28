import { FoodProps, FoodType } from '../../index'
import FoodCard from '../FoodCard'
import './index.css'

interface IProps {
  foods: FoodProps[]
  onAdd: (type: FoodType, food: FoodProps, count: number) => void
  onReduce: (type: FoodType, food: FoodProps, count: number) => void
  onSelect: (food: FoodProps) => void
}

const Cart: React.FC<IProps> = ({ foods, onAdd, onReduce, onSelect }) => {
  return (
    <div className="menu">
      {foods.map(food => (
        <FoodCard key={food.id} food={food} onAdd={onAdd} onReduce={onReduce} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default Cart
