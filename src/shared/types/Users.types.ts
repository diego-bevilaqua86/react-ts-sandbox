export type User = {
  _id?: string;
  name: string;
  email: string;
  companyId: string;
};

export type FetchUsersFilters = {
  name?: string;
  email?: string;
  companyId?: string;
};
