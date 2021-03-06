import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from './task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private router: Router, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      const taskId = params['task'];
      if (taskId) {
        this.load(taskId);
      }
    });
  }

  get currentTask() {
    return this.currentTaskAsSubject;
  }

  private currentTaskAsSubject = new Subject<ITask>()

  private updateLanguage(task: ITask, taskId: string) {
    const params = {
      "language": task.Language,
      "task": taskId
    }
    this.router.navigate(['/'], { queryParams: params });
  }

  private load(taskId: string) {
    const options = {
      withCredentials: true,
    }

    this.http.get<ITask>(`content/${taskId}.json`, options).subscribe(t => {
      this.updateLanguage(t, taskId);
      this.currentTaskAsSubject.next(t);
    });
  }

  getHtml(fileName: string) {
    const options = {
      withCredentials: true,
      responseType: 'text' as const
    }

    return this.http.get(`content/${fileName}`, options);
  }
}
