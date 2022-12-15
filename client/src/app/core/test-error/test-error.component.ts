import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
   // baseUrl = 'https://localhost:5001/api/';
  baseUrl = environment.apiUrl;
  validationError : any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'product/42').subscribe({
      next :(v) => {
       console.log(v);
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next :(v) => {
       console.log(v);
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next :(v) => {
       console.log(v);
      },
      error : (err) => {
        console.error(err);
      },
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'product/fourtytwo').subscribe({
      next :(v) => {
       console.log(v);
      },
      error : (err) => {
        console.error(err);
        this.validationError = err.error.errors;
      },
    });
  }

}
