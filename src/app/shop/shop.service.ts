import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {delay, map} from "rxjs";
import {IPagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/type";
import {ShopParams} from "../shared/models/shopParams";
import {IProduct} from "../shared/models/product";

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  baseUrl: string = 'https://localhost:7087/api/';

  constructor(private http: HttpClient) {
  }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search.toString());
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'Products', {observe: 'response', params})
      .pipe(
        delay(1000),
        map(response => {
          return response.body;
        })
      )
  }

  getProduct(id: number | null) {
    console.log(id)
    return this.http.get<IProduct>(this.baseUrl + 'Products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'Products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'Products/types');
  }

}
