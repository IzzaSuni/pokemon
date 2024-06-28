import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import "./index.css";
import Homepage from "./pages/homepage";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./network/network.config";
import "./index.css";
import ListPokemons from "./pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "list",
    element: <ListPokemons />,
  },
]);
export default function App() {
  return (
    <Layout>
      <React.Suspense fallback={null}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.Suspense>
    </Layout>
  );
}
