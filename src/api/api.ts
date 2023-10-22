import { AccountApi, Configuration, ConfigurationParameters, RestaurantApi } from "@dparty/core-ts-sdk";

export const token = localStorage.getItem("token");



export let basePath = "https://ordering.sum-foods.com";
if (window.location.hostname === "ordering-uat.sum-foods.com") {
  basePath = "https://ordering-uat.sum-foods.com";
}

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
