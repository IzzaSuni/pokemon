export enum ResponseStatus {
  Error,
  Success,
}

export type Pagination = {
  count: number;
  next: number;
  previous: number;
};

type Data = object | [] | null;

export type ApiResponse = {
  status: ResponseStatus;
  message: string;
  data: Data;
  pagination?: Pagination;
};

// Overload signatures
export function response(status: ResponseStatus, message: string): ApiResponse;
export function response(data: Data): ApiResponse;
export function response(data: Data, pagination: Pagination): ApiResponse;
export function response(
  status: ResponseStatus,
  message: string,
  data: Data
): ApiResponse;
export function response(
  status: ResponseStatus,
  message: string,
  data: Data,
  pagination: Pagination
): ApiResponse;

// Implementation
export function response(
  statusOrData: ResponseStatus | Data,
  messageOrPagination?: string | Pagination,
  dataOrPagination?: Data | Pagination,
  pagination?: Pagination
): ApiResponse {
  if (typeof statusOrData === "object" || Array.isArray(statusOrData)) {
    // Handles response(data: Data)
    if (typeof messageOrPagination === "undefined") {
      return {
        status: ResponseStatus.Success,
        message: "sukses",
        data: statusOrData,
      };
    }

    // Handles response(data: Data, pagination: Pagination)
    return {
      status: ResponseStatus.Success,
      message: "sukses",
      data: statusOrData,
      pagination: messageOrPagination as Pagination,
    };
  }

  if (typeof messageOrPagination === "string") {
    // Handles response(status: ResponseStatus, message: string)
    if (typeof dataOrPagination === "undefined") {
      return {
        status: statusOrData,
        message: messageOrPagination,
        data: [],
      };
    }

    // Handles response(status: ResponseStatus, message: string, data: Data)
    if (typeof pagination === "undefined") {
      return {
        status: statusOrData,
        message: messageOrPagination,
        data: dataOrPagination as Data,
      };
    }

    // Handles response(status: ResponseStatus, message: string, data: Data, pagination: Pagination)
    return {
      status: statusOrData,
      message: messageOrPagination,
      data: dataOrPagination as Data,
      pagination: pagination,
    };
  }

  throw new Error("Invalid arguments");
}
