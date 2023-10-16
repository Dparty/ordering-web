import "./index.css";
import logoPngUrl from "../../assets/png/logo.png";
import { useEffect, useState } from "react";
import { restaurantApi } from "../../api/api";
import { Table } from "@dparty/core-ts-sdk";
import SelectTableNum from "./SelectTableNum";

interface ISelectTableModalProps {
  restaurantId: string;
  tableList: Table[] | null;
  title?: string;
}

const SelectTableModal: React.FC<ISelectTableModalProps> = ({ restaurantId, tableList, title }) => {
  const [selectedOption, setSelectedOption] = useState<Table | null>(null);

  const onSelectOption = (option: Table) => {
    setSelectedOption(option);
  };

  return (
    <div className="select-tables">
      <div className="select-tables__mask"></div>
      <div className="select-tables__content">
        <div className="select-tables__content-header">
          <div className="select-tables__content-header-title">{title}</div>
        </div>
        <div className="select-tables__content-body">
          <div className="select-tables-container">
            <SelectTableNum
              options={tableList}
              onSelectOption={onSelectOption}
              selectedOption={selectedOption}
            />
            <div className="select-tables-container-bottom">
              <button
                className={"select-tables-submit-btn select-tables-submit-btn-usable"}
                onClick={() => {
                  window.location.href = `/ordering/?restaurantId=${restaurantId}&tableId=${selectedOption?.id}`;
                }}
              >
                開始點餐
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TablesPage = () => {
  const [tableList, setTableList] = useState<Table[] | null>([]);

  // 從 url 中獲取餐廳 id
  const search = window.location.search;
  const query = new URLSearchParams(search);
  const restaurantId = query.get("restaurantId") || "";

  const getTableList = async (restaurantId: string) => {
    try {
      const res = await restaurantApi.getRestaurant({ id: restaurantId });
      if (res) {
        setTableList(res.tables);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 請求可選的桌列表
    getTableList(restaurantId);
  }, [restaurantId]);

  return (
    <div className="tables">
      <SelectTableModal
        restaurantId={restaurantId}
        tableList={tableList}
        title={"桌號獲取失敗，請手動選擇桌號"}
      />
      <img className="tables__logo" src={logoPngUrl} alt="logo" />
    </div>
  );
};

export default TablesPage;
