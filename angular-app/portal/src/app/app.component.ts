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
  tables;

  constructor(private tournamentService: TournamentService) {
      this.tournamentService.getResults().subscribe(results => {
        this.results = results;
      });

      this.tournamentService.rounds().subscribe(response => {
          this.tables = response['tables'];
      });
  }
}
