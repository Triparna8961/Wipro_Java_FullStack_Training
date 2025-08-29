import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search/title`, { params: { title } });
  }

  searchBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search/author`, { params: { author } });
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/isbn/${isbn}`);
  }
}