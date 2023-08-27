import './index.css'
import cancelPngUrl from '../../../../assets/png/cancel.png'
import { useEffect, useState } from 'react'
import { FoodProps, FoodType } from '../../index'
import SpecificationsOptions, { SpecificationsOptionsProps } from '../SpecificationsOptions'
import utils from '../../../../utils/index'

interface IProps {
  food?: FoodProps
  visiable: boolean
  specificationTags: SpecificationsOptionsProps[]
  onCancel: () => void
  onAdd: (tyep: FoodType, food: FoodProps, count: number, specifications: Record<string, string>, remark?: string) => void
}

const SelectSpecifications: React.FC<IProps> = ({ food, visiable, specificationTags, onCancel, onAdd }) => {
  const [currentFood, setCurrentFood] = useState(food)

  const specificationsChange = (value: Record<string, string>) => {
    if (currentFood) {
      let _selectSpecificationsFood = currentFood
      _selectSpecificationsFood.specifications = { ..._selectSpecificationsFood.specifications, ...value }
      setCurrentFood({ ..._selectSpecificationsFood })
    }
  }

  const remarkChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentFood) {
      setCurrentFood({ ...currentFood, remark: event.target.value })
    }
  }

  useEffect(() => {
    if (food) {
      setCurrentFood(food)
    } else {
      setCurrentFood(undefined)
    }
  }, [food])

  if (!visiable) return null

  return (
    <div className="select-specifications">
      <div className="select-specifications__mask"></div>
      <div className="select-specifications__content">
        <div className="select-specifications__content-header">
          <div className="select-specifications__content-header-title">{currentFood?.name ?? ''}</div>
          <div className="select-specifications__content-header-cancel" onClick={onCancel}>
            <img className="cancel-img" src={cancelPngUrl} alt="关闭" />
          </div>
        </div>
        <div className="select-specifications__content-body">
          <div className="specifications-container">
            {/* tags */}
            <SpecificationsOptions
              options={specificationTags}
              selectedOptions={currentFood?.specifications ? Object.values(currentFood?.specifications) : []}
              onChange={specificationsChange}
            />
            {/* 备注 */}
            <div className="specifications-container-remark">
              <div className="remark-title">备注</div>
              <div className="remark-input">
                <textarea placeholder="请输入您的口味喜好～" value={currentFood?.remark} onChange={remarkChange} />
              </div>
            </div>
            {/* 总价 */}
            <div className="specifications-container-bottom">
              <div className="specifications-price">
                总价 <span>¥99</span>
              </div>
              <button
                className={`specifications-submit-btn${
                  !utils.isEmptyObject(currentFood?.specifications)
                    ? ' specifications-submit-btn-usable'
                    : ' specifications-submit-btn-disable'
                }`}
                onClick={() => onAdd(FoodType.SPECIFICATIONS, currentFood!, 1, currentFood?.specifications, currentFood!.remark)}
              >
                + 加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectSpecifications
