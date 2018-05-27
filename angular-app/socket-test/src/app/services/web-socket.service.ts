import { Subject, Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Subject<any>;

  connect(url: string): Subject<any> {
    if (!this.socket) {
      this.socket = this.create(url);
    }

    return this.socket;
  }

  private create(url: string): Subject<any> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      }
    );

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return Subject.create(observer, observable);
  }
}
