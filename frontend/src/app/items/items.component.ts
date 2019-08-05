import {Component, OnInit} from '@angular/core';
import {Item} from '../model/item.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AthenticationService} from '../service/authentication.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemList: Item[] = [];
  taskId: number;
  cols: any[];
  selectedItem: Item = new Item();
  newItem = false;
  displayDialog: boolean;
  displayNewItem: boolean;

  item: Item = new Item();
  private statusItem: any;
  display = false;
  warningMessage: string;
  // tslint:disable-next-line:variable-name
  _location: Location;
  displayaddLink = false;
  private dependencyItem = [{label: 'Seçiniz', value: 0}];
  dependencySelected: number;
  dependentId: number;

  constructor(public authService: AthenticationService, private router: Router,
              private route: ActivatedRoute, private location: Location) {
    this._location = location;
    this.cols = [
      {field: 'name', header: 'İsim'},
      {field: 'description', header: 'Açıklama'},
      {field: 'deadline', header: 'Tarih'},
      {field: 'status', header: 'Durumu'},
      {field: 'dependencyItems', header: 'Bağlılık'}
    ];
    this.statusItem = [
      {label: 'Tümü'},
      {label: 'Yapıldı', value: 'COMPLETE'},
      {label: 'Yapılacak', value: 'NOT_COMPLETE'}
    ];
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.taskId = id;
        this.getAllitems();
      }
    });
  }

  getAllitems() {
    this.authService.getAllitems(this.taskId).subscribe(items => {
      this.itemList = items;

      console.log(this.itemList);
    });
  }

  onRowSelect(event) {
    this.newItem = false;
    this.item = this.copyItem(event.data);
    this.displayDialog = true;
  }

  copyItem(c: Item): Item {
    const item = new Item();
    for (const prop in c) {
      item[prop] = c[prop];
    }
    return item;
  }

  createOneItem() {
    this.displayNewItem = true;

    this.router.navigate(['/item/new', this.taskId]);
  }

  eraseOneItem(id: number) {
    this.authService.eraseOneItem(id).subscribe();
    this.itemList = this.itemList.filter(item => item.id !== id);
    this.displayDialog = false;
  }

  done(id: number) {
    this.authService.done(id).subscribe(result => {
      location.reload(true);
      const res: Map<string, string> = result;
      this.displayDialog = false;
      this.warningMessage = res.get('result');

      if (this.warningMessage != null && this.warningMessage !== '') {
        this.display = true;
      }

    });
  }

  addLinkScreen(rowData: any) {
    this.displayaddLink = true;
    this.dependentId = rowData.id;
    for (const item of this.itemList) {
      if (item.id !== rowData.id) {
        this.dependencyItem.push({label: item.name, value: item.id});
      }
    }
  }

  addLink() {
    const item: Item = this.itemList.find(selectedItem => selectedItem.id === this.dependencySelected);
    console.log(this.dependentId, item);
    this.authService.addLink(this.dependentId, item).subscribe(response => {
      this.displayaddLink = false;
      location.reload();
    });
  }
}
