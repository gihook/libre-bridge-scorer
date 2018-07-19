import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css']
})
export class RoundsTableComponent {
  @Input() tables;
  displayedColumns = ['number', 'ns', 'ew', 'boards'];
}
