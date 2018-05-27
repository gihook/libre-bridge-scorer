import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  socket: Subject<any>;
//   results: any[];
  message: string;
  text: string;
  entries: any[];

  constructor(private webSocketService: WebSocketService) {

  }

  ngOnInit() {
    this.socket = this.webSocketService.connect('ws://localhost:8999');
    this.socket.subscribe(message => {
        console.log('Receiving...');
        console.log(message);

        const response = JSON.parse(message.data);
        this.entries = response.data;
        this.message = response.message;
    });
  }

  send() {
    this.socket.next(this.text);
  }
}
