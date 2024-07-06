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
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persister, queryClient } from "./network/network.config";
import "./index.css";
import ListPokemons from "./pages/list-pokemon";
import Detail from "./pages/detail";
import { SnackbarProvider } from "notistack";
import Favorite from "./pages/favorite";
import ErrorBoundary from "./pages/404";

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
    element: <ErrorBoundary />,
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorBoundary />}>
      {path?.map((v) => (
        <Route index {...v} errorElement={<ErrorBoundary />} />
      ))}
    </Route>
  )
);
export default function App() {
  return (
    <React.Suspense fallback={null}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: persister }}
      >
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
      </PersistQueryClientProvider>
    </React.Suspense>
  );
}
