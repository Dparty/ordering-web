import "./index.css";
import { FoodProps, Order } from "../../index";
import { useMemo, useState } from "react";
import React from "react";
import FoodCard from "../FoodCard";
import { Item } from "warmsilver-core-ts-sdk";
import { getAmount } from "../../../../utils";

interface IProps {
  pushCart: (item: Item, selectedOptions: Map<string, string>) => void;
  items: Item[];
  orders: Order[];
  removeCart: (item: Item, selectedOptions: Map<string, string>) => void;
  onSelect: (item: Item) => void;
}

const Menu: React.FC<IProps> = ({
  removeCart,
  onSelect,
  items,
  orders,
  pushCart,
}) => {
  // const [activeMenuId, setActiveMenuId] = useState<string>(menus[0].id);
  const [isScrollingTo, setScrollingTo] = useState<string | null>(null);

  const clickLeftMenu = (id: string) => {
    setScrollingTo(id);
    // menuRefs[id].current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      // setActiveMenuId(id);
      setScrollingTo(null); // 点击事件的滚动结束，重置isScrollingTo
    }, 500); // 延时应稍大于滚动动画的时间
  };
  const getItemsByTag = (tag: string) => {
    return items.filter(
      (item) => item.tags.filter((t) => t === tag).length !== 0
    );
  };
  const tags = useMemo(() => {
    const tags = new Set<string>();
    items
      .reduce((tags, item) => {
        return [...tags, ...item.tags];
      }, new Array<string>())
      .forEach((tag) => tags.add(tag));
    return Array.from(tags);
  }, [items]);
  return (
    <div className="menu page-container">
      <div className="left-menu">
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`left-menu-item ${true ? "active" : "normal"}`}>
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className="right-menu">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="right-menu-type text-ellipsis">{tag}</div>
            {getItemsByTag(tag).map((item, index) => (
              <FoodCard
                removeCart={removeCart}
                pushCart={pushCart}
                amount={getAmount(orders, item.id)}
                onSelect={onSelect}
                key={index}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
