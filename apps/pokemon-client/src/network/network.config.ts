import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import axios, { Method } from "axios";

export type Response<T> = {
  message: string;
  status: number;
  data: T;
  pagination: {
    count: number;
    next: number;
    previous: number;
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const persister = createSyncStoragePersister({
  key: "QUERY_CACHE",
  storage: window.localStorage,
});

export type RequestArgs = {
  method: Method;
  data: object;
  params: object;
  url: string;
};

export const API_BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001/"
    : "pokemon-discover-api.vercel.app";

export default function request<Res>({
  method,
  data,
  params,
  url,
}: Partial<RequestArgs>): Promise<Response<Res>> {
  return axios
    .request({ method, baseURL: API_BASE_URL, data, params, url })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
