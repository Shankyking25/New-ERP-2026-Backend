import { baseApi } from "../../../services/api/baseApi";

/* =========================
   PAYROLL API
========================= */

export const payrollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       GET ALL PAYROLLS
    ========================== */
    getPayrolls: builder.query({
      query: (params) => ({
        url: "/payroll",
        method: "GET",
        params,
      }),

      providesTags: ["Payroll"],
    }),

/* =========================
   GET SINGLE PAYROLL
========================= */
    getPayrollById: builder.query({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "GET",
      }),
    }),

/* =========================
   CREATE PAYROLL
========================= */
    createPayroll: builder.mutation({
      query: (body) => ({
        url: "/payroll",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Payroll"],
    }),

/* =========================
   UPDATE PAYROLL
========================= */
    updatePayroll: builder.mutation({
      query: ({ id, body }) => ({
        url: `/payroll/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Payroll"],
    }),

/* =========================
   DELETE PAYROLL
========================= */
    deletePayroll: builder.mutation({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Payroll"],
    }),

/* =========================
   PAYROLL STATS
========================= */
    getPayrollStats: builder.query({
      query: () => ({
        url: "/payroll/stats",
        method: "GET",
      }),

      providesTags: ["Payroll"],
    }),

  }),
});

/* =========================
   EXPORT HOOKS
========================= */

export const {

  useGetPayrollsQuery,

  useGetPayrollByIdQuery,

  useCreatePayrollMutation,

  useUpdatePayrollMutation,

  useDeletePayrollMutation,

  useGetPayrollStatsQuery,

} = payrollApi;