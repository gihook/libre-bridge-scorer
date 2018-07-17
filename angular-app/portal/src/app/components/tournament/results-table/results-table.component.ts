import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {
  @Input() results;
  displayedColumns = ['nsPair', 'ewPair', 'contract', 'declarer', 'score'];
}
