import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "./App";
import { restaurantApi } from "./api/api";

export function lazyWithRetry(componentImport: any) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );
    try {
      const component = await componentImport();
      window.localStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      const err = error as Error;
      if (err.name === "ChunkLoadError" && !pageHasAlreadyBeenForceRefreshed) {
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }
      throw error;
    }
  });
}

const Home = lazyWithRetry(() => import("./views/home"));
const Order = lazyWithRetry(() => import("./views/order"));
const Submit = lazyWithRetry(() => import("./views/submit"));
const Complete = lazyWithRetry(() => import("./views/complete"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "order/:restaurantId/:tableId",
        element: (
          <Suspense>
            <Order />
          </Suspense>
        ),
        loader: ({ params }) => {
          return new Promise((resolve, reject) => {
            const tableId = params.tableId as string;
            const restaurantId = params.restaurantId as string;
            restaurantApi
              .listRestaurantItems({ id: restaurantId! })
              .then((itemList) => {
                const items = itemList.data;
                restaurantApi
                  .listRestaurantTable({
                    id: restaurantId,
                  })
                  .then((list) => {
                    const table = list.data!.find(
                      (table) => table.id === tableId
                    );
                    if (table) {
                      resolve({ table: table, items: items });
                    }
                  });
              });
          });
        },
      },
      {
        path: "submit",
        element: (
          <Suspense>
            <Submit />
          </Suspense>
        ),
      },
      {
        path: "complete",
        element: (
          <Suspense>
            <Complete />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
