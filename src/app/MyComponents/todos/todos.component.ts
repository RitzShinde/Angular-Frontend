import { Component, OnInit } from '@angular/core';
import { Todo } from "../../Todo";
import { TodoService } from "src/app/todo.service"; // Assuming the correct path to TodoService


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  snoCounter: number = 1; // Initialize sno counter


  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAllTodos().subscribe((data: Todo[]) => {
      this.todos = data;
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }

  addTodo(todo: Todo) {
    // this.todoService.addTodo(todo).subscribe((newTodo: Todo) => {
    //   this.todos.push(newTodo);
    // });
  }
  

  toggleTodo(todo: Todo) {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index].active = !this.todos[index].active;
      // Optionally update status on the server here as well
      // this.todoService.updateTodoStatus(todo.id, this.todos[index].active).subscribe();
    }
  }
}
