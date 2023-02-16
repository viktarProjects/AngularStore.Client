import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {ShopService} from "./shop.service";
import {IBrand} from "../../shared/models/brand";
import {IType} from "../../shared/models/type";
import {ShopParams} from "../../shared/models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  shopParams: ShopParams;
  totalCount: number = 0;
  @ViewChild('search', {static: false}) searchTerm: ElementRef | undefined;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ]

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response!.data;
      this.totalCount = response!.count;
    }, error => {
      console.log(error);
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
        this.brands = response;
      },
      error => {
        console.log(error)
      })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
        this.types = response;
      },
      error => {
        console.log(error)
      })
  }

  onBrandSelected(brand: string,event:any) {
    const params = this.shopService.getShopParams();
    const index = params.brands.indexOf(brand);
    if (index < 0) {
      params.brands.push(brand);
    } else {
      params.brands.splice(index, 1);
    }
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(type: string) {
    const params = this.shopService.getShopParams();
    const index = params.types.indexOf(type);
    if (index < 0) {
      params.types.push(type);
    } else {
      params.types.splice(index, 1);
    }
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.searchTerm!.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
