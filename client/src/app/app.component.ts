import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './Models/pagination';
import { IProduct } from './Models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products : IProduct[];
  constructor(private http  : HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/Product').subscribe({
      next: (v:IPagination) => {this.products = v.data; console.log(this.products)},
      error: (e) => console.log(e),
      complete: () => console.log("complete")
    });
    // this.http.get('https://localhost:5001/api/Product').subscribe((response:any)=>{
    //   this.products = response.data;
    //   console.log(this.products);
    // });
  }
 
}
 