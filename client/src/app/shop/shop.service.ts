import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brands';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<IPagination>(this.baseUrl + 'Product?pageSize=50');
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'Product/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'Product/types');
  }
}
