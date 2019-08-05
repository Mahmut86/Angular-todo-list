import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AthenticationService } from '../service/authentication.service';
import {Task} from '../model/task.model';


@Component({
  selector: 'app-one-list',
  templateUrl: './one-list.component.html',
  styleUrls: ['./one-list.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class TaskDetail implements OnInit {
  displayNewTaskList: boolean;
  @Input() task: Task = new Task();
  mode;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false;
  constructor(public authService: AthenticationService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.navigated = true;
        this.authService.getList(id).subscribe(task => (this.task = task));
      } else {
        this.navigated = false;
      }
    });
    this.displayNewTaskList = true;

  }

  svOneList(task) {
    this.authService.svList(task).subscribe(resp => {
      this.task = resp;
      this.router.navigateByUrl('/tasks');

    }, err => {
      this.mode = 0;
    });


  }

  updateList(task: Task) {
    this.authService.uptList(task).subscribe(resp => {
      this.task = resp;
      this.router.navigateByUrl('/tasks');
    });  }
}
