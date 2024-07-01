import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import "./index.css";
import Homepage from "./pages/homepage";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./network/network.config";
import "./index.css";
import ListPokemons from "./pages/list";
import Detail from "./pages/detail";

const path = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "list",
    element: <ListPokemons />,
  },
  {
    path: "detail/:name",
    element: <Detail />,
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {path?.map((v) => (
        <Route index {...v} />
      ))}
    </Route>
  )
);
export default function App() {
  return (
    <React.Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Suspense>
  );
}
