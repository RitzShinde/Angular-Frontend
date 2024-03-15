import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { TodoItemComponent } from './MyComponents/todo-item/todo-item.component';
import { AddTodoComponent } from './MyComponents/add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
