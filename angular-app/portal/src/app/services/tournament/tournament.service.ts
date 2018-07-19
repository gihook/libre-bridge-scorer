import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getResults() {
      return this.http.get('/assets/klubski-saleski.json');
  }

  rounds() {
      return this.http.get('/assets/howell4-28.json');
  }
}
