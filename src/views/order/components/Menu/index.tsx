import './index.css'
import { FoodProps, FoodType, MenuProps } from '../../index'
import { useState } from 'react'
import React from 'react'
import FoodCard from '../FoodCard/index'

interface IProps {
  menus: MenuProps[]
  onAdd: (type: FoodType, food: FoodProps, count: number) => void
  onReduce: (type: FoodType, food: FoodProps, count: number) => void
  onSelect: (food: FoodProps) => void
}

const Menu: React.FC<IProps> = ({ menus, onAdd, onReduce, onSelect }) => {
  const [activeMenuId, setActiveMenuId] = useState<string>(menus[0].id)
  const [isScrollingTo, setScrollingTo] = useState<string | null>(null)

  const menuRefs: { [key: string]: React.RefObject<HTMLDivElement> } = menus.reduce(
    (refs: { [key: string]: React.RefObject<HTMLDivElement> }, menu) => {
      refs[menu.id] = React.createRef<HTMLDivElement>()
      return refs
    },
    {}
  )
  //点击左侧菜单时
  const clickLeftMenu = (clickMenu: MenuProps) => {
    setScrollingTo(clickMenu.id)
    menuRefs[clickMenu.id].current!.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      setActiveMenuId(clickMenu.id)
      setScrollingTo(null) // 点击事件的滚动结束，重置isScrollingTo
    }, 500) // 延时应稍大于滚动动画的时间
  }

  //右侧菜单滚动
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    if (isScrollingTo) return
    if (!event.nativeEvent.isTrusted) return

    const activeMenu = menus.find((menu: MenuProps) => {
      const rect = menuRefs[menu.id].current!.getBoundingClientRect()
      return rect.top < 280 && rect.bottom > 280
    })

    setActiveMenuId(activeMenu ? activeMenu.id : activeMenuId)
  }
  return (
    <div className="menu page-container">
      <div className="left-menu">
        {menus.map(menu => (
          <div
            key={menu.id}
            className={`left-menu-item ${menu.id === activeMenuId ? 'active' : 'normal'}`}
            onClick={() => {
              clickLeftMenu(menu)
            }}
          >
            <span>{menu.type}</span>
          </div>
        ))}
      </div>
      <div className="right-menu" onScroll={handleScroll}>
        {menus.map(menu => (
          <div key={menu.id} ref={menuRefs[menu.id]}>
            <div className="right-menu-type text-ellipsis">{menu.type}</div>
            {menu.items.map((item, index) => (
              <FoodCard key={index} food={item} onAdd={onAdd} onReduce={onReduce} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
