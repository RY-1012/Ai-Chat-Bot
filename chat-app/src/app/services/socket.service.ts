import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io('http://localhost:3000');

  join(username: string) {
    this.socket.emit('join', username);
  }

  sendMessage(data: any) {
    this.socket.emit('sendMessage', data);
    this.socket.emit('typing');
  }

  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', data => observer.next(data));
    });
  }

  onTyping(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('typing', () => observer.next(true));
    });
  }

  getUsers(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('users', users => observer.next(users));
    });
  }
}
