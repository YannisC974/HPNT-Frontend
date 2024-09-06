import { apiSlice } from "../api/apiSlice";
export const DataListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHero: builder.query({
      query: (data) => ({
        url: `http://127.0.0.1:8000/data/hero-data-json/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),

  endpoints: (builder) => ({
    getLoginData: builder.query({
      query: (data) => ({
        url: `http://127.0.0.1:8000/data/home-data-json/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),

  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (data) => ({
        url: `http://127.0.0.1:8000/data/hero-data-json/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),

  endpoints: (builder) => ({
    getTicketData: builder.query({
      query: (data) => ({
        url: `http://127.0.0.1:8000/data/ticket-data-json/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetHeroQuery,
  useGetLoginDataQuery,
  useGetHeroDataQuery,
  useGetTicketDataQuery,
} = DataListApi;
