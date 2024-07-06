export enum ResponseStatus {
  Error,
  Success,
}

export type Pagination = {
  count: number;
  next: number;
  previous: number;
};

export type ApiResponse = {
  status: ResponseStatus;
  message: string;
  data: object | [];
  pagination?: Pagination;
};

// Overload signatures
export function response(status: ResponseStatus, message: string): ApiResponse;
export function response(data: object | []): ApiResponse;
export function response(
  data: object | [],
  pagination: Pagination
): ApiResponse;
export function response(
  status: ResponseStatus,
  message: string,
  data: object | []
): ApiResponse;
export function response(
  status: ResponseStatus,
  message: string,
  data: object | [],
  pagination: Pagination
): ApiResponse;

// Implementation
export function response(
  statusOrData: ResponseStatus | object | [],
  messageOrPagination?: string | Pagination,
  dataOrPagination?: object | [] | Pagination,
  pagination?: Pagination
): ApiResponse {
  if (typeof statusOrData === "object" || Array.isArray(statusOrData)) {
    // Handles response(data: object | [])
    if (typeof messageOrPagination === "undefined") {
      return {
        status: ResponseStatus.Success,
        message: "sukses",
        data: statusOrData,
      };
    }

    // Handles response(data: object | [], pagination: Pagination)
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

    // Handles response(status: ResponseStatus, message: string, data: object | [])
    if (typeof pagination === "undefined") {
      return {
        status: statusOrData,
        message: messageOrPagination,
        data: dataOrPagination as object | [],
      };
    }

    // Handles response(status: ResponseStatus, message: string, data: object | [], pagination: Pagination)
    return {
      status: statusOrData,
      message: messageOrPagination,
      data: dataOrPagination as object | [],
      pagination: pagination,
    };
  }

  throw new Error("Invalid arguments");
}
