import { QueryClient } from "react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60,
    },
  },
});

export const persister = createSyncStoragePersister({
  key: "QUERY_CACHE",
  storage: window.localStorage,
});
