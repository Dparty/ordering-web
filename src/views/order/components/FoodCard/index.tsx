import React, { useMemo } from "react";
import exampleFoodPngUrl from "../../../../assets/png/example.png";
import reducePngUrl from "../../../../assets/png/reduce.png";
import addPngUrl from "../../../../assets/png/add.png";
import "./index.css";
import { Item } from "@dparty/core-ts-sdk";
import { Pair } from "../..";
import { PairToMap, getPricing } from "../../../../utils";

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
  options?: Pair[];
}

const FoodCard: React.FC<IProps> = ({
  item,
  onSelect,
  amount,
  pushCart,
  removeCart,
  options = [],
  actionType,
}) => {
  const actionTypeNode = () => {
    if (item.attributes.length !== 0 && actionType !== "cart") {
      return (
        <div className="food-card__action-specifications">
          <button
            style={{}}
            onClick={() => onSelect(item)}
            className="food-card__action-specifications action-specifications">
            規格
          </button>
        </div>
      );
    }
    return (
      <div className="food-card__action-normal">
        <img
          className="action-btn"
          onClick={() => removeCart(item, PairToMap(options))}
          src={reducePngUrl}
          alt="减"
        />
        <div className="action-normal-number">{amount ? amount : 0}</div>
        <img
          className="action-btn"
          onClick={() => pushCart(item, PairToMap(options))}
          src={addPngUrl}
          alt="加"
        />
      </div>
    );
  };
  const pricing = useMemo(() => {
    return getPricing({ item: item, options: options });
  }, [options]);
  const optionsString = useMemo(() => {
    return options.map((option) => `${option.left}:${option.right}`).join(",");
  }, [options]);
  return (
    <div className="food-card">
      <div className="food-card__img">
        <img className="food-img" src={exampleFoodPngUrl} alt="品項圖片" />
      </div>
      <div className="food-card__info">
        <div className="info-header">
          <div className="food-card__info-name text-ellipsis">{item.name}</div>
          <div className="food-card__info-desc text-ellipsis">
            {optionsString}
          </div>
        </div>
        {item && (
          <div className="food-card__info-price">
            <span>${pricing / 100}</span>
          </div>
        )}
      </div>
      {actionTypeNode()}
    </div>
  );
};

export default FoodCard;
