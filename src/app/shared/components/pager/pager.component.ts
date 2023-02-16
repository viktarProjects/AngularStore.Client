import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 6;
  @Input() pageNumber!:number;
  @Output() pageChanged = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page);
  }

}
