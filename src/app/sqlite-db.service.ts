  import { Injectable } from '@angular/core';
  import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
  import { environment } from 'src/environments/environment';


  @Injectable({
    providedIn: 'root'
  })
  export class SqliteDBService {
    database: SQLiteObject | undefined;

    constructor(private sqlite: SQLite) {
      if (environment.cardova) {
        // Import SQLite plugin only when running in Cordova environment
        this.sqlite = sqlite;
      } else {
        // Set database to undefined when running in web environment
        this.database = undefined;
      }
    }

    async openDatabase() {
      this.database = await this.sqlite.create({
        name: 'todos.db',
        location: 'default'
      });
    }

    async createTable() {
      await this.database?.executeSql('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)', []);
    }

    async addTodo(title: string, description: string) {
      await this.database?.executeSql('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description]);
    }

    async deleteTodo(sno: number) {
      await this.database?.executeSql('DELETE FROM todos WHERE id = ?', [sno]);
    }

    async getAllTodos() {
      const result = await this.database?.executeSql('SELECT * FROM todos', []);
      let todos = [];
      if (result?.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          todos.push(result.rows.item(i));
        }
      }
      return todos;
    }
  }
