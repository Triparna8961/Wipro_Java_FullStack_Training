import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${id}`);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  updateAdmin(id: number, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}