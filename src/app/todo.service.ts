import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Todo } from 'src/app/Todo';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/GetAllTodos`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(`${this.apiUrl}/AddTodo`, todo, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteTodo/${id}`);
}
  
}

  

