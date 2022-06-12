import { NextFunction, Request, Response } from "express";
import { QueryType } from "../types/types";

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let defaultPageNumber = 1;
  let defaultPageSize = 10;
  let defaultSearchTerm = '';

  const pageNumber = req.query.PageNumber as QueryType;
  const pageSize = req.query.PageSize as QueryType;
  const searchNameTerm = req.query.SearchNameTerm as QueryType


  if (pageNumber) {
    defaultPageNumber = Number(pageNumber);
  }
  if (pageSize) {
    defaultPageSize = Number(pageSize)
  }

  if (searchNameTerm) {
    defaultSearchTerm = searchNameTerm as string;
  }

  const paginationParams = {
    pageNumber: defaultPageNumber,
    pageSize: defaultPageSize,
    skip: (defaultPageNumber - 1) * defaultPageSize,
    searchNameTerm: defaultSearchTerm,
  }

  req.paginationParams = paginationParams;

  next();
}