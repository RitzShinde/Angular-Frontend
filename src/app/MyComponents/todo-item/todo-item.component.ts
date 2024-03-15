import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Input() i!: number; // Add input property for the index
  @Output() todoCheckBox: EventEmitter<Todo> = new EventEmitter<Todo>(); // Issue here

  constructor(private cdr: ChangeDetectorRef) { }

  OnClick(todo: Todo) {
    // Emit the todo to be deleted to the parent component
    this.todoDelete.emit(todo);
  }

  onCheckBoxClick(todo: Todo) {
    this.todoCheckBox.emit(todo);
  }
}
