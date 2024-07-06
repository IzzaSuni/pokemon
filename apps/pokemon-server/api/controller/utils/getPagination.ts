import { Request } from "express";

type Pagination = {
  offset: string;
  limit: string;
  search: string;
};

export default function getPagination(
  req: Request<null, null, null, Pagination>,
  dataLength: number
) {
  let {
    query: { offset, limit, search },
  } = req;

  const end = parseInt(limit) || 100;
  const start = parseInt(offset) || 0;
  const next = start + end;

  const pagination = {
    count: dataLength,
    next: next >= dataLength ? start : next,
    previous: start > end ? start - end : 0,
  };

  return pagination;
}
