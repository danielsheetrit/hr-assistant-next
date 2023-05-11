import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HOST = process.env.NEXT_PUBLIC_HOST || "http://127.0.0.1:5000";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Dialogs"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    dialogs: builder.query({
      query: () => ({
        url: "/dialogs",
      }),
      providesTags: ["Dialogs"],
    }),
    getDialog: builder.query({
      query: (params) => ({
        url: "/dialog",
        params,
      }),
    }),
    createDialog: builder.mutation({
      query: (body) => ({
        url: "/chat",
        body: JSON.stringify(body),
        method: "POST",
      }),
      invalidatesTags: ["Dialogs"],
    }),
    updateDialog: builder.mutation({
      query: (body) => ({
        url: "/chat",
        body: JSON.stringify(body),
        method: "PUT",
      }),
      invalidatesTags: ["Dialogs"],
    }),
    deleteDialogs: builder.mutation({
      query: (body) => ({
        url: "/dialogs-delete",
        method: "DELETE",
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["Dialogs"],
    }),
  }),
});

export const { usePrefetch } = apiService;

export const {
  useRegisterMutation,
  useDialogsQuery,
  useDeleteDialogsMutation,
  useGetDialogQuery,
  useCreateDialogMutation,
  useUpdateDialogMutation,
} = apiService;
