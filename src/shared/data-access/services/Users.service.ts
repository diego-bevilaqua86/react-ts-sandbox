/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from "axios";
import { APIEndpointGenerator } from "../../types/API.types";
import { FetchUsersFilters, User } from "../../types/Users.types";
import { http } from "../http";

export const buildParams = <
  Q extends Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >
>(
  queryParams: Q
): URLSearchParams => {
  const params = new URLSearchParams();
  (Object.keys(queryParams) as Array<keyof Q>).forEach((key) => {
    if (queryParams[key]) {
      if (Array.isArray(queryParams[key])) {
        params.set(key.toString(), (queryParams[key] as []).join(","));
      } else {
        params.set(key.toString(), queryParams[key].toString());
      }
    }
  });
  return params;
};

export const USERS_ENDPOINTS: Record<string, APIEndpointGenerator> = {
  fetchUsers: (queryParams: FetchUsersFilters) => {
    return {
      url: "http://localhost:5000/users",
      params: buildParams<FetchUsersFilters>(queryParams),
    };
  },
};

export const fetchUsers = async (filters: FetchUsersFilters) => {
  const { url, params } = USERS_ENDPOINTS.fetchUsers(filters);
  const apiResponse = await http.get<
    Array<User>,
    AxiosResponse<Array<User>, void>,
    void
  >(url, { params });
  return apiResponse.data;
};
