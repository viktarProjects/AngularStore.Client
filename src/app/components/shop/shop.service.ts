import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {delay, map, of} from "rxjs";
import {IPagination, Pagination} from "../../shared/models/pagination";
import {IBrand} from "../../shared/models/brand";
import {IType} from "../../shared/models/type";
import {ShopParams} from "../../shared/models/shopParams";
import {IProduct} from "../../shared/models/product";

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  baseUrl: string = 'https://localhost:7087/api/';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {
  }

  getProducts(useCache: boolean) {

    if (!useCache) {
      this.productCache = new Map();
    }

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brands.length > 0) {
      params = params.append('brands', this.shopParams.brands.toString());
    }
    if (this.shopParams.types.length > 0) {
      params = params.append('types', this.shopParams.types.toString());
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search.toString());
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageNumber', this.shopParams.pageNumber.toString());
    params = params.append('pageIndex', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'Products', {observe: 'response', params})
      .pipe(
        delay(1000),
        map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response.body!.data);
          this.pagination = response.body!;
          return this.pagination;
        })
      )
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number | null) {
    let product!: IProduct | undefined;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find(p => p.id === id);
    })
    if (product) {
      return of(product);
    }

    return this.http.get<IProduct>(this.baseUrl + 'Products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'Products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'Products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }

}
