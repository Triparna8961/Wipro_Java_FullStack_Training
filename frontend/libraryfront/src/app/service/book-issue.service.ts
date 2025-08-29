import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookIssue } from '../models/book-issue.model';

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {
  private baseUrl = 'http://localhost:8080/api/book-issues';

  constructor(private http: HttpClient) { }

  getAllBookIssues(): Observable<BookIssue[]> {
    return this.http.get<BookIssue[]>(this.baseUrl);
  }

  getBookIssueById(id: number): Observable<BookIssue> {
    return this.http.get<BookIssue>(`${this.baseUrl}/${id}`);
  }

  getBookIssuesByCustomerId(customerId: number): Observable<BookIssue[]> {
    return this.http.get<BookIssue[]>(`${this.baseUrl}/customer/${customerId}`);
  }

  getBookIssuesByBookId(bookId: number): Observable<BookIssue[]> {
    return this.http.get<BookIssue[]>(`${this.baseUrl}/book/${bookId}`);
  }

  getOverdueBookIssues(): Observable<BookIssue[]> {
    return this.http.get<BookIssue[]>(`${this.baseUrl}/overdue`);
  }

  issueBook(bookId: number, customerId: number, dueDate: Date): Observable<BookIssue> {
    return this.http.post<BookIssue>(`${this.baseUrl}/issue`, null, {
      params: { 
        bookId: bookId.toString(), 
        customerId: customerId.toString(),
        dueDate: dueDate.toISOString().split('T')[0]
      }
    });
  }

  returnBook(bookIssueId: number): Observable<BookIssue> {
    return this.http.put<BookIssue>(`${this.baseUrl}/return/${bookIssueId}`, {});
  }
}