import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public getNewMessage$(): Observable<string> {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }
}
