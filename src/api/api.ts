import {
  AccountApi,
  Configuration,
  ConfigurationParameters,
  RestaurantApi,
} from "@dparty/core-ts-sdk";

export const token = localStorage.getItem("token");

// export let basePath = "https://core-uat.k8s19932be1.boardware.com";
export let basePath = "https://ordering-api-uat.sum-foods.com";

const accountApi = new AccountApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);

export const restaurantApi = new RestaurantApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);

export default accountApi;
