import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{ static : true}) searchTemp : ElementRef 
  products : IProduct[];
  brands : IBrand[];
  types : IType[];
  shopParams = new ShopParams();
  totalCount : number = 0;
  sortOption = [
    {name : 'Alphabetical', value : 'name'},
    {name : 'Price : Low to High', value : 'priceAsc'},
    {name : 'Price : High to Low', value : 'priceDesc'}
  ]
  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next :(v) => {
        this.products = v.data;
        this.shopParams.pageNumber = v.pageIndex;
        this.shopParams.pageSize = v.pageSize;
        this.totalCount = v.count;
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next :(v) => {
        // this.brands = v;
        console.log(v);
        this.brands = [{name : 'All' ,id: 0 }, ...v];
        console.log(this.brands);
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next :(v) => {
        this.types = [{id: 0 , name : 'All'}, ...v];
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  onBrandSelected(brandId : number){
    this.shopParams.brandIdSelected = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeIdSelected = typeId;
    this.shopParams.pageNumber = 1;
    this.getTypes();
  }

  onSortSelected(sort : string){
    this.shopParams.sortSelected = sort;
    this.getProducts();
  }

  onPageChanged(event : any){
    debugger;
    if(this.shopParams.pageNumber !== event.page){
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
   
  }

  onSearch(){
    this.shopParams.search = this.searchTemp.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTemp.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
