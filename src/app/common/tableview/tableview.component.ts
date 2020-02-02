import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {


  @Input() columns: any[];

  @Input() rowData: any[];

  @Output() rowClick: EventEmitter<any>;

  public tableSort = {
    attribute : 'index' ,
    order : true
  };

  constructor() {

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
