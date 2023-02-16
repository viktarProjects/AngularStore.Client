import {empty} from "rxjs";

export class ShopParams {
  brands: string[] = [];
  types: string[] = [];
  sort: string = 'name';
  pageNumber: number = 1;
  pageSize: number = 6;
  search: string | undefined = "";
}
