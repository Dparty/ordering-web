import { AccountApi, Configuration, ConfigurationParameters, RestaurantApi } from "@dparty/core-ts-sdk";

export const token = localStorage.getItem("token");

export const basePath = "https://ordering-api-uat.sum-foods.com";
// export let basePath = "http://localhost:8080";
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
