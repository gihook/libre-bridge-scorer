import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pair-mapper',
  templateUrl: './pair-mapper.component.html',
  styleUrls: ['./pair-mapper.component.css']
})
export class PairMapperComponent implements OnInit {
  @Input() pairs: any[];
  @Input() pairId;
  result: string;

  ngOnInit() {
    const players = this.pairs.filter(x => x.id === this.pairId)[0].players;

    this.result = `${players[0]} - ${players[1]}`;
  }

}
