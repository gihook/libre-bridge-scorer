import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-parser',
  templateUrl: './result-parser.component.html',
  styleUrls: ['./result-parser.component.css']
})
export class ResultParserComponent implements OnInit {
    @Input() result = '4sxx';
    level: string;
    suit: string;

    ngOnInit() {
        this.level = this.result[0];
        this.suit = this.result[1];
    }
}
