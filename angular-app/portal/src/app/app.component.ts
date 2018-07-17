import { Component } from '@angular/core';
import { TournamentService } from './services/tournament/tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  results;

  constructor(private tournamentService: TournamentService) {
      this.tournamentService.getResults().subscribe(results => {
        console.log(results);
        this.results = results;
      });
  }
}
