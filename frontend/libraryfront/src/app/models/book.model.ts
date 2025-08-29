export class Book {
  id?: number;
  title: string = '';
  author: string = '';
  isbn: string = '';
  publishedDate?: string;
  totalCopies: number = 1;
  availableCopies: number = 1;
  status: string = 'AVAILABLE'; // AVAILABLE, ISSUED
}
