import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./api-types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis"],
    endpoints: (build) => ({
      getKpis: build.query<Array<GetKpisResponse>, void>({
        query: () => "kpi/kpis/",
        providesTags: ["Kpis"],
      }),
    }),
  });
  