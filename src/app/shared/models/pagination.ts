import {IProduct} from "./product";

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

export class Pagination implements IPagination{
  pageNumber!: number;
  pageSize!: number;
  count!: number;
  data: IProduct[] = [];
}
