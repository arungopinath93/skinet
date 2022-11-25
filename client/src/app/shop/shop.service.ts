import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brands';
import { delay, map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  getProducts(shopParams : ShopParams){
    let params = new HttpParams();
    if(shopParams.brandIdSelected !== 0){
      params = params.append('brandId', shopParams.brandIdSelected.toString());
    }
    if(shopParams.typeIdSelected !== 0){
      params = params.append('typeId', shopParams.typeIdSelected.toString());
    }
    params = params.append('sort', shopParams.sortSelected);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    // return this.http.get<IPagination>(this.baseUrl + 'Product?pageSize=50');
    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }
    return this.http.get<IPagination>(this.baseUrl + 'Product', {observe : 'response', params})
      .pipe(
        // delay(1000),
        map(respone =>{
          return respone.body;
        })
      )
  }
  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'Product/' + id);
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'Product/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'Product/types');
  }
}
