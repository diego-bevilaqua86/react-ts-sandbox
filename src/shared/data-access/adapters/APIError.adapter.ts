import { APIError } from "../../types/API.types";
import { isAxiosError } from "../utils/isAxiosError";

export const APIErrorAdapter = (error: unknown): Error => {
  let message: string;

  if (isAxiosError<APIError>(error) && error.response) {
    message =
      error.response.data.message ??
      `[ ${error.response.status} ] ${error.response.statusText}`;
  } else {
    message = (error as Error).message;
  }
  return new Error(message);
};
