import React from "react";
import exampleFoodPngUrl from "../../../../assets/png/example.png";
import reducePngUrl from "../../../../assets/png/reduce.png";
import addPngUrl from "../../../../assets/png/add.png";
import "./index.css";
import { FoodType } from "../../index";
import { Item } from "warmsilver-core-ts-sdk";

export enum FoodCardActionType {
  SPECIFICATIONS = "specifications",
  NORMAL = "normal",
}

interface IProps {
  amount?: number;
  item: Item;
  actionType?: string;
  pushCart: (item: Item, selectedOptions: Map<string, string>) => void;
  removeCart: (item: Item, selectedOptions: Map<string, string>) => void;
  onSelect: (item: Item) => void;
}

const FoodCard: React.FC<IProps> = ({
  item,
  onSelect,
  amount,
  pushCart,
  removeCart,
}) => {
  const actionTypeNode = () => {
    if (item.attributes.length !== 0) {
      return (
        <div
          className="food-card__action-specifications"
          onClick={() => onSelect(item)}>
          <button className="action-specifications">選規格</button>
        </div>
      );
    }
    return (
      <div className="food-card__action-normal">
        <img
          className="action-btn"
          // onClick={() => removeCart(item)}
          src={reducePngUrl}
          alt="减"
        />
        <div className="action-normal-number">{amount ? amount : 0}</div>
        <img
          className="action-btn"
          onClick={() => pushCart(item, new Map<string, string>())}
          src={addPngUrl}
          alt="加"
        />
      </div>
    );
  };

  return (
    <div className="food-card">
      <div className="food-card__img">
        <img className="food-img" src={exampleFoodPngUrl} alt="品項圖片" />
      </div>
      <div className="food-card__info">
        <div className="info-header">
          <div className="food-card__info-name text-ellipsis">{item.name}</div>
          {/* <div className="food-card__info-desc text-ellipsis">{item!.de}</div> */}
        </div>
        {item && (
          <div className="food-card__info-price">
            <span>${item.pricing / 100}</span>
          </div>
        )}
      </div>
      {actionTypeNode()}
    </div>
  );
};

export default FoodCard;
