import './index.css'
import { FoodProps, FoodType } from '../../index'
import { useState } from 'react'
import React from 'react'
import FoodCard from '../FoodCard/index'

interface IProps {
  menu?: MenuProps[]
  onAdd: (type: FoodType, food: FoodProps, count: number) => void
  onReduce: (type: FoodType, food: FoodProps, count: number) => void
  onSelect: (food: FoodProps) => void
}

interface MenuProps {
  id: string
  type: string
  items: FoodProps[]
}

const mockMenus: MenuProps[] = [
  {
    id: '1111',
    type: '刺身拼盘1刺身拼盘1刺身拼盘1刺身拼盘1刺身拼盘1',
    items: [
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
      }
    ]
  },
  {
    id: '2222',
    type: '寿司拼盘2',
    items: [
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
  },
  {
    id: '3333',
    type: '寿司拼盘3',
    items: [
      {
        id: 8,
        name: '菜品8',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 9,
        name: '菜品9',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 10,
        name: '菜品10',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '4444',
    type: '寿司拼盘4',
    items: [
      {
        id: 11,
        name: '菜品51',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 12,
        name: '菜品61',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 71,
        name: '菜品71',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '5555',
    type: '寿司拼盘5',
    items: [
      {
        id: 52,
        name: '菜品52',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 62,
        name: '菜品62',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 72,
        name: '菜品72',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '6666',
    type: '寿司拼盘6',
    items: [
      {
        id: 53,
        name: '菜品53',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 63,
        name: '菜品63',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 73,
        name: '菜品73',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '7777',
    type: '寿司拼盘7',
    items: [
      {
        id: 54,
        name: '菜品54',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 64,
        name: '菜品64',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 74,
        name: '菜品74',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '8888',
    type: '寿司拼盘8',
    items: [
      {
        id: 55,
        name: '菜品55',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 65,
        name: '菜品65',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 75,
        name: '菜品75',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '9999',
    type: '寿司拼盘9',
    items: [
      {
        id: 56,
        name: '菜品56',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 66,
        name: '菜品66',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 76,
        name: '菜品76',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: [
      {
        id: 57,
        name: '菜品57',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 4,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 67,
        name: '菜品67',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 78,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      },
      {
        id: 77,
        name: '菜品77',
        desc: '月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭',
        price: 58,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: ''
      }
    ]
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  },
  {
    id: '101010',
    type: '寿司拼盘10',
    items: []
  }
]

const Menu: React.FC<IProps> = ({ onAdd, onReduce, onSelect }) => {
  const [activeMenuId, setActiveMenuId] = useState<string>(mockMenus[0].id)
  const [isScrollingTo, setScrollingTo] = useState<string | null>(null)

  const menuRefs: { [key: string]: React.RefObject<HTMLDivElement> } = mockMenus.reduce(
    (refs: { [key: string]: React.RefObject<HTMLDivElement> }, mockMenu) => {
      refs[mockMenu.id] = React.createRef<HTMLDivElement>()
      return refs
    },
    {}
  )
  //点击左侧菜单时
  const clickLeftMenu = (mockMenu: MenuProps) => {
    setScrollingTo(mockMenu.id)
    menuRefs[mockMenu.id].current!.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      setActiveMenuId(mockMenu.id)
      setScrollingTo(null) // 点击事件的滚动结束，重置isScrollingTo
    }, 500) // 延时应稍大于滚动动画的时间
  }

  //右侧菜单滚动
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    if (isScrollingTo) return
    if (!event.nativeEvent.isTrusted) return

    const activeMenu = mockMenus.find((menu: MenuProps) => {
      const rect = menuRefs[menu.id].current!.getBoundingClientRect()
      return rect.top < 280 && rect.bottom > 280
    })

    setActiveMenuId(activeMenu ? activeMenu.id : activeMenuId)
  }
  return (
    <div className="menu page-container">
      <div className="left-menu">
        {mockMenus.map(mockMenu => (
          <div
            key={mockMenu.id}
            className={`left-menu-item ${mockMenu.id === activeMenuId ? 'active' : 'normal'}`}
            onClick={() => {
              clickLeftMenu(mockMenu)
            }}
          >
            <span>{mockMenu.type}</span>
          </div>
        ))}
      </div>
      <div className="right-menu" onScroll={handleScroll}>
        {mockMenus.map(mockMenu => (
          <div key={mockMenu.id} ref={menuRefs[mockMenu.id]}>
            <div className="right-menu-type text-ellipsis">{mockMenu.type}</div>
            {mockMenu.items.map((item, index) => (
              <FoodCard key={index} food={item} onAdd={onAdd} onReduce={onReduce} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
