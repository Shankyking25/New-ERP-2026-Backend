import { baseApi } from "../../../services/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getRecentEmployees: builder.query({
      query: () => ({
        url: "/dashboard/recent-employees",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getDashboardCharts: builder.query({
      query: () => ({
        url: "/dashboard/charts",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetRecentEmployeesQuery,
  useGetDashboardChartsQuery,
} = dashboardApi;