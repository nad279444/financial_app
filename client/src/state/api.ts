import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse , GetProductsResponse, GetTransactionsResponse} from "./api-types";
import openDatabase from "../../db/open_db";

// Custom base query for IndexedDB
const indexedDBBaseQuery = async (args: string) => {
  const db = await openDatabase();
  const storeName = args.split("/")[0]; // Extract the store name from the endpoint

  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);

  const data = await store.getAll(); // Fetch all data from the store

  await transaction.done;

  if (!data.length) {
    throw new Error(`No data found in ${storeName}`);
  }

  return { data };
};

export const api = createApi({
  baseQuery: indexedDBBaseQuery,
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpis", // Just using the store name here
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "products", // Just using the store name here
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transactions", // Just using the store name here
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
console.log(useGetKpisQuery)
console.log(useGetProductsQuery)
console.log(useGetTransactionsQuery)