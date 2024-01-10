import { useSuspenseQuery } from "@tanstack/react-query";
import { FetchUsersFilters } from "../../types/Users.types";
import { fetchUsers } from "../services/Users.service";

export const useFetchUsers = (filters: FetchUsersFilters) => {
  return useSuspenseQuery({
    queryKey: ["users", "fetch", ...Object.values(filters)],
    queryFn: async () => fetchUsers(filters),
  });
};
