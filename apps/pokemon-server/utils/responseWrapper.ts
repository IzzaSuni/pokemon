export enum ResponseStatus {
  Error,
  Success,
}
export function response(
  status: ResponseStatus,
  message: string,
  data: object = {}
) {
  return {
    status,
    message,
    data,
  };
}
