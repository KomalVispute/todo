import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public dataSubject = new Subject<Task>();
  public dataState = this.dataSubject.asObservable();

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/posts"
  }

  private userVerifiedSource = new Subject<any>();
  recieve(task:Task) {
    console.warn("task",task.task_name)
   this.userVerifiedSource.next(task.task_name);
  }

  addTask(task : Task) : Observable<Task> { //add task
    return this.http.post<Task>(this.serviceURL,task);
  }

  getAllTask() : Observable<Task[]> { //all task
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(task : Task) : Observable<Task> { //delete task
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  editTask(task : Task) : Observable<Task> { //edit task
    return this.http.put<Task>(this.serviceURL+'/'+task.id,task);
  }
}
