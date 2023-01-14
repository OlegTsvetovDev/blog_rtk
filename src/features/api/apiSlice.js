import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3500";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({}),
});

export { apiSlice };
