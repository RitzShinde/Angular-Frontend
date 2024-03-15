import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/Todo';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
    todoForm!: FormGroup;
    @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
    @Input() todoCount: number = 0;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

    ngOnInit(): void {
        this.todoForm = this.formBuilder.group({
            title: ['', Validators.required],
            desc: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.todoForm.valid) {
            const title = this.todoForm.get('title')!.value;
            const description = this.todoForm.get('desc')!.value;

            const todo: Todo = {
                id: generateUUID(),
                title,
                description,
                active: true
            };

            this.http.post<Todo>(`${environment.apiUrl}/AddTodo`, todo).subscribe(
                (newTodo) => {
                    console.log('Todo added successfully:', newTodo);
                    this.todoAdd.emit(newTodo);
                    this.todoForm.reset();
                },
                (error) => {
                    console.error('Error adding todo:', error);
                }
            );
        }
    }
}

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
