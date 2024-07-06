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
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./network/network.config";
import "./index.css";
import ListPokemons from "./pages/list-pokemon";
import Detail from "./pages/detail";
import { SnackbarProvider } from "notistack";
import Favorite from "./pages/favorite";

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
  {
    path: "favorite",
    element: <Favorite />,
  },
  {
    path: "*",
    element: (
      <h2 style={{ width: "300px", margin: "auto", textAlign: "center" }}>
        404 Not Found
      </h2>
    ),
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
        <SnackbarProvider
          className="snackbar"
          variant="warning"
          hideIconVariant
          preventDuplicate
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "start",
          }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
