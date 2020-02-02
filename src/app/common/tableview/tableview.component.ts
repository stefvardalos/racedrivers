import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {


  @Input() columns: any[];

  @Input() rowData: any[];

  // @Output() onOpenTree: EventEmitter<{ parentID: number }>;

  public tableSort = {
    attribute : 'index' ,
    order : true
  };

  constructor() { }

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
