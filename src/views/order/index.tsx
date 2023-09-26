import "./index.css";
import foodIntroductionUrl from "../../assets/png/food-introduction.png";
import SubmitButton from "../../components/SubmitButton";
import Cart from "./components/Cart";
import { useMemo, useState } from "react";
import Menu from "./components/Menu";
import SelectSpecifications from "./components/SelectSpecifications";
import { useLoaderData, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import { basePath, restaurantApi } from "../../api/api";
import { Item, Table } from "@dparty/core-ts-sdk";
import {
  MapEqual,
  MapToPair,
  PairToMap,
  getCart,
  getPricing,
} from "../../utils";
import FoodCard from "./components/FoodCard";
import PageHeader from "../../components/PageHeder";

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

export interface CartOrder {
  order: Order;
  amount: number;
}

const OrderPage = () => {
  const navigate = useNavigate();
  const { table, items } = useLoaderData() as {
    table: Table;
    items: Item[];
  };
  const [cartVisiable, setCartVisiable] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectingSpecificationsItem, setSelectingSpecificationsItem] =
    useState<Item>();

  const [showMessage, setShowMessage] = useState(false);
  const cartCount = useMemo(() => {
    return orders.length;
  }, [orders]);
  const total = useMemo(() => {
    return orders.reduce((total, order) => total + getPricing(order), 0);
  }, [orders]);

  const pushCart = (item: Item, selectedOptions: Map<string, string>) => {
    setSelectingSpecificationsItem(undefined);
    setOrders([...orders, { item: item, options: MapToPair(selectedOptions) }]);
  };
  const removeCart = (item: Item, options: Map<string, string>) => {
    let index = -1;
    orders.forEach((order, i) => {
      if (
        order.item.id === item.id &&
        MapEqual(PairToMap(order.options), options)
      ) {
        index = i;
      }
    });
    setOrders(orders.filter((_, i) => i !== index));
  };
  const [disable, setDisable] = useState(false);
  const submit = () => {
    if (!cartVisiable) {
      setCartVisiable(true);
      return;
    }
    setDisable(true);
    const sp = orders.map((order) => ({
      itemId: order.item.id,
      options: order.options,
    }));
    restaurantApi
      .createBill({
        id: table.id,
        createBillRequest: {
          orders: sp,
        },
      })
      .then((e) => {
        navigate("/complete");
      });
    // .catch((e) => {
    //   console.log(e);
    // });
    // fetch(`${basePath}/tables/${table.id}/orders`, {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });
  };
  const cartOrders = useMemo(() => {
    return getCart(orders, []);
  }, [orders]);
  return (
    <div className="order page-container">
      <PageHeader name={"和食"} table=""></PageHeader>
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
            removeCart={removeCart}
            onSelect={setSelectingSpecificationsItem}
            items={items}
          />
        </div>
        {/* 购物车 如果购物车是空的不会弹起 */}
        <Cart
          title="購物車"
          visiable={cartVisiable}
          onCancel={() => setCartVisiable(false)}>
          {/* 购物车里面的每个菜品 */}
          {cartOrders.map((cartOrder, index) => {
            return (
              <FoodCard
                options={cartOrder.order.options}
                amount={cartOrder.amount}
                removeCart={() =>
                  removeCart(
                    cartOrder.order.item,
                    PairToMap(cartOrder.order.options)
                  )
                }
                pushCart={pushCart}
                onSelect={(item) => {}}
                item={cartOrder.order.item}
                actionType="cart"
                key={index}></FoodCard>
            );
          })}
        </Cart>
      </div>
      {/* 最下面的选好了按钮 */}
      <div className="order_bottom">
        <SubmitButton
          disable={cartCount === 0 || disable}
          count={cartCount}
          onShow={() => setCartVisiable(true)}
          onSubmit={submit}
          btnText={cartVisiable ? "確定" : "選好了"}
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
        <Message
          message="請在購物車中操作"
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
};

export default OrderPage;
