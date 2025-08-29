export class BookIssue {
  id?: number;
  book?: {
    id: number;
    title: string;
    author: string;
  };
  member?: {
    id: number;
    name: string;
    email: string;
  };
  loanDate?: string;
  dueDate?: string;
  returnDate?: string;
  status: string = 'BORROWED'; // BORROWED, RETURNED, LATE
}
