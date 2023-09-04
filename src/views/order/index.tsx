import "./index.css";
import foodIntroductionUrl from "../../assets/png/food-introduction.png";
import SubmitButton from "../../components/SubmitButton";
import Cart from "./components/Cart";
import { useCallback, useEffect, useMemo, useState } from "react";
import Menu from "./components/Menu";
import SelectSpecifications from "./components/SelectSpecifications";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import { restaurantApi } from "../../api/api";
import { Item } from "warmsilver-core-ts-sdk";
import { MapToPair, getPricing } from "../../utils";
import FoodCard from "./components/FoodCard";

export enum FoodType {
  NORMAL = "normal",
  SPECIFICATIONS = "specifications",
}

export interface Pair {
  left: string;
  right: string;
}
export interface Order {
  item: Item;
  options: Pair[];
}

export interface FoodProps {
  id: number;
  name: string;
  desc: string;
  price: number;
  count: number;
  specifications?: any;
  remark?: string;
}

export interface MenuProps {
  id: string;
  type: string;
  items: FoodProps[];
}

const mockMenus: MenuProps[] = [
  {
    id: "1111",
    type: "主食",
    items: [
      {
        id: 1,
        name: "菜品100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠",
        desc: "月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭",
        price: 28,
        count: 0,
        specifications: {
          weight: "",
          aaa: "",
          bbb: "",
        },
        remark: "",
      },
      {
        id: 2,
        name: "菜品200+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠",
        desc: "月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭",
        price: 27,
        count: 0,
        specifications: {
          weight: "",
          aaa: "",
          bbb: "",
        },
        remark: "",
      },
      {
        id: 3,
        name: "菜品300+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠",
        desc: "月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭",
        price: 55,
        count: 0,
        // specifications: {
        //   size: 'large'
        // },
        remark: "",
      },
      {
        id: 4,
        name: "菜品400+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠",
        desc: "月售100+菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭菠萝饭",
        price: 99,
        count: 0,
        specifications: {
          weight: "",
          aaa: "",
          bbb: "",
          bbbc: "",
        },
        remark: "",
      },
    ],
  },
];

const OrderPage = () => {
  const navigate = useNavigate();
  const { restaurantId, tableId } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [cartVisiable, setCartVisiable] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectingSpecificationsItem, setSelectingSpecificationsItem] =
    useState<Item>();
  //需要选规格的食物。在总的food列表进行add操作时，每次都需要弹出选规格弹框，在购物车进行add操作时不用弹出。
  const [menus, setMenus] = useState<MenuProps[]>(mockMenus);
  useEffect(() => {
    restaurantApi
      .listRestaurantItems({ id: restaurantId! })
      .then((itemList) => {
        setItems(itemList.data);
      });
  }, [restaurantId]);
  //购物车里的food
  const [selectedFoods, setSelectedFoods] = useState<FoodProps[]>([]);

  const [showMessage, setShowMessage] = useState(false);

  // const [cartCount, setCartCount] = useState(0);
  const cartCount = useMemo(() => {
    return orders.length;
  }, [orders]);
  const onSubmit = () => {
    if (selectedFoods.length > 0) {
      navigate("/submit");
    }
  };
  const total = useMemo(() => {
    return orders.reduce((total, order) => total + getPricing(order), 0);
  }, [orders]);
  const showCart = () => {
    if (selectedFoods.length === 0) {
      return;
    }
    setCartVisiable(!cartVisiable);
  };

  const cancelCart = () => {
    setCartVisiable(false);
  };

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const changeFood = (foodId: number, count: number) => {
    const _menus = menus.map((menu) => {
      menu.items = menu.items.map((food) => {
        if (food.id === foodId) {
          return { ...food, count: food.count + count };
        } else {
          return food;
        }
      });
      return menu;
    });
    setMenus(_menus);
  };
  const pushCart = (item: Item, selectedOptions: Map<string, string>) => {
    setSelectingSpecificationsItem(undefined);
    setOrders([{ item: item, options: MapToPair(selectedOptions) }, ...orders]);
  };

  const reduceFood = useCallback(
    (
      foodType: FoodType,
      food: FoodProps,
      count: number,
      actionType?: string
    ) => {
      if (foodType === FoodType.SPECIFICATIONS && actionType !== "cart") {
        handleShowMessage();
        showCart();
        return;
      }

      const _menus = menus.map((menu) => {
        menu.items = menu.items.map((_food) => {
          if (_food.id === food.id) {
            let _count = _food.count;
            if (food.count === count || food.count === 0) {
              _count = 0;
            } else {
              _count = food.count - count;
            }
            return { ..._food, count: _count };
          } else {
            return _food;
          }
        });
        return menu;
      });
      setMenus(_menus);

      //购物车food减数量
      const index = selectedFoods.findIndex(
        (selectedFood) => selectedFood.id === food.id
      );
      const _selectedFoods = selectedFoods;
      if (index > -1) {
        if (selectedFoods[index].count === count) {
          _selectedFoods.splice(index, 1);
        } else if (selectedFoods[index].count < count) {
          _selectedFoods[index].count = 0;
        } else {
          _selectedFoods[index].count = selectedFoods[index].count - count;
        }
      }
      setSelectedFoods([..._selectedFoods]);
    },
    [selectedFoods]
  );

  const countPrice = () => {
    let _price = 0;
    if (selectedFoods.length > 0) {
      selectedFoods.forEach((i) => {
        _price = _price + i.count * i.price;
      });
    }
  };

  useEffect(() => {
    //刷新以后从localstorge中拿到信息回显
    if (selectedFoods.length > 0) {
      selectedFoods.forEach((i) => changeFood(i.id, i.count));
    }
  }, []);

  //将购物车信息存在localstorge中
  useEffect(() => {
    sessionStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
    countPrice();
  }, [selectedFoods]);

  //将购总价存在localstorge中

  return (
    <div className="order page-container">
      <div className="order_top">
        {/* 最上面的的图片 */}
        <div className="order_top-img">
          <img className="img" src={foodIntroductionUrl} alt="菜品介紹" />
        </div>
        {/* 中间滚动的menu */}
        <div className="order_top-menu">
          <Menu
            pushCart={pushCart}
            orders={orders}
            removeCart={(item, options) => console.log(item, options)}
            onSelect={setSelectingSpecificationsItem}
            items={items}
          />
        </div>
        {/* 购物车 如果购物车是空的不会弹起 */}
        <Cart title="購物車" visiable={cartVisiable} onCancel={cancelCart}>
          {/* 购物车里面的每个菜品 */}
          {orders.map((order, index) => {
            return (
              <FoodCard
                removeCart={(item, options) => console.log(item, options)}
                pushCart={pushCart}
                onSelect={(item) => {}}
                item={order.item}
                actionType="cart"
                key={index}></FoodCard>
            );
          })}
        </Cart>
      </div>
      {/* 最下面的选好了按钮 */}
      <div className="order_bottom">
        <SubmitButton
          disable={cartCount === 0}
          count={cartCount}
          onShow={() => setCartVisiable(true)}
          onSubmit={onSubmit}
          btnText="選好了"
          price={total}
          showCartImg></SubmitButton>
      </div>
      {/* 选规格modal */}
      <SelectSpecifications
        pushCart={pushCart}
        item={selectingSpecificationsItem}
        onCancel={() =>
          setSelectingSpecificationsItem(undefined)
        }></SelectSpecifications>
      {showMessage && (
        <Message message="請在購物車中操作" onClose={handleCloseMessage} />
      )}
    </div>
  );
};

export default OrderPage;
