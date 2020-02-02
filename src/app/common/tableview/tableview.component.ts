import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as faicons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {


  @Input() columns: any[];

  @Input() rowData: any[];

  @Input() tableTitle: string;

  @Output() rowClick: EventEmitter<any>;

  public tableSort = {
    attribute : 'index' ,
    order : true
  };

  public icons;

  constructor() {
    this.icons = faicons;
    this.rowClick = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  changeSorting(attribute) {
    if (this.tableSort.attribute === attribute) {
      this.tableSort.order = !this.tableSort.order;
    } else {
      this.tableSort.attribute = attribute;
      this.tableSort.order = true;
    }
    this.tableSort = Object.assign({} , this.tableSort);
  }

}
