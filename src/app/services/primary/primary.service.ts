import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { endPoints } from '../endPoints';
import { map } from 'rxjs';
import { ProductRes } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PrimaryService {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  getCategories() {
    return this.http
      .get<{ _id: string; name: string }[]>(environment.apiUrl + endPoints.primary.allCategories)
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  getProducts(categoryName: string, limit: number, page: number) {
    return this.http
      .get<ProductRes>(environment.apiUrl + endPoints.primary.products, {
        params: {
          limit,
          page,
          ...(categoryName && categoryName !== 'all' && { category: categoryName }),
        },
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }
}
