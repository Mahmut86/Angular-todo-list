import {Component, OnInit} from '@angular/core';
import {Item} from '../model/item.model';
import {SelectItem} from 'primeng/api';
import {AthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-one-item',
  templateUrl: './one-item.component.html',
  styleUrls: ['./one-item.component.css']
})
export class OneItemComponent implements OnInit {
  item: Item = new Item();
  statusItem: SelectItem[];
  taskId: number;
  navigated = false;
  deadline: Date;

  constructor(public authService: AthenticationService, private router: Router,
              private route: ActivatedRoute) {
    this.statusItem = [
      {label: 'Tümü', value: null},
      {label: 'Yapıldı', value: 'COMPLETE'},
      {label: 'Yapılacak', value: 'NOT_COMPLETE'}
    ];
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.taskId = id;
        this.navigated = true;
        this.authService.getItem(id).subscribe(item => (this.item = item));
      } else {
        this.navigated = false;
      }
    });
  }

  svOneItem(item: Item) {
    console.log(item);
    this.authService.svItem(item, this.taskId).subscribe(resp => {
      this.item = resp;
      this.router.navigateByUrl('/itemlist/' + this.taskId);

    });


  }
}
