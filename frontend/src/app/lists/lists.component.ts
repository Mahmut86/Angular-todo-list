import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AthenticationService } from '../service/authentication.service';



@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  tasks ;
  color: string;
  displayNewTaskList: boolean;
  displayTaskDetail: boolean;
  constructor(public authService: AthenticationService, private router: Router) {
    this.getLists();

  }

  ngOnInit() {

    this.getLists();
  }
  getLists() {
    this.authService.getLists()
      .subscribe(data => {
        this.tasks = data;
      }, err => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
  }
  newList() {
    this.router.navigateByUrl('/tasks/new');
    this.displayNewTaskList = true;

  }

  eraseList(id: number) {
  this.authService.eraseList(id).subscribe();
  this.tasks = this.tasks.filter(item => item.id !== id);
  }
  uptList(id: number) {
    this.displayTaskDetail = true;
    this.router.navigate(['/tasks/detail', id]);
  }


  itemList(id: number) {
    this.router.navigate(['/itemlist', id]);
    this.color = 'active';
  }
}
