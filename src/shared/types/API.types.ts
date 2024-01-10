export type OnMutationSettledHandler<TData, TError, TVariables> = (
  data: TData | undefined,
  error: TError | null,
  variables: TVariables
) => Promise<unknown> | unknown;

export type OnMutationSuccessHandler<TData, TVariables> = (
  data: TData,
  variables: TVariables
) => Promise<unknown> | unknown;

export type OnMutationErrorHandler<TError, TVariables> = (
  error: TError,
  variables: TVariables
) => Promise<unknown> | unknown;

export type OnMutateHandler<TVariables> = (
  variables: TVariables
) => Promise<unknown> | unknown;

export type DefaultMutationEvents<TData, TError, TVariables> = {
  onSuccess?: OnMutationSuccessHandler<TData, TVariables>;
  onError?: OnMutationErrorHandler<TError, TVariables>;
  onSettled?: OnMutationSettledHandler<TData, TError, TVariables>;
};

export type QueryKeyFn = (...args: Array<string>) => Array<string>;

export type QueryKeys = Record<string, QueryKeyFn>;

export type APIError = Record<string, unknown> & { message: string };

export type APIMockData<D> = {
  status: number;
  data: D;
};

export type APIEndpoint = {
  url: string;
  params?: URLSearchParams;
};

export type APIEndpointGenerator<Q extends object = object> = (
  queryParams: Q
) => APIEndpoint;
